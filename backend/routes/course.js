const models = require('../models')

exports.createCourse = async (req, res) => {
    const {  name, curriculums, initial  } = req.body

    if (!name) return res.status(422).json({ msg: "O nome do curso é obrigatório" })
    if (!initial) return res.status(422).json({ msg: "A sigla do curso é obrigatória" })
    if (!curriculums) return res.status(422).json({ msg: "As matérias do curso são obrigatórias" })


    const courseExist = await models.Course.findOne({ initial })

    if(courseExist) return res.status(400).json({ msg: "Curso já cadastrado!"})

    const course = new models.Course({
        name,
        initial,
        curriculums
    });

    try {
        await course.save()
        res.status(201).json({ msg: "Curso criado com sucesso" })
    } catch (error) {
        console.log({ error })
        return res.status(500).json({ msg: "Algo deu errado, tente novamente mais tarde!" })
    }

}

exports.listCourses = async (req, res) => {
    const courses = await models.Course.find()
    
    return res.status(200).send({ msg: " lista de cursos cadastrados", courses })
}

exports.updateCourse = async (req, res) => {
    const course = await models.Course.findById(req.params.id)

    const { name, curriculums} = req.body


    if (name && name !== course.name) course.name = name
    if (curriculums) course.curriculums = curriculums
    try {
        course.save()
        return res.status(200).json({msg: 'Atualizado com sucesso', course})
    } catch (error) {
        console.log({ error })
        return res.status(500).json({ msg: "Algo deu errado, tente novamente mais tarde!" })
    }
}

exports.myCourse = async (req, res) => {

    try {
        
        const user = await models.User.findById(req.userId)
    
        const course = await models.Course.findOne({ initial: user.courseInital})
        const subjects = await models.Subject.find({ userId: req.userId })

        const subjectsDone = []
        for (const curriculum of course.curriculums) {
            const _curriculum = await models.Curriculum.findById(curriculum)
            const _subject = subjects.find(({curriculumId}) => curriculumId === curriculum)
            subjectsDone.push({
                aproved:  _subject ? _subject.aproved : false,
                nameSubject: _curriculum.nameSubject,
                cod: _curriculum.cod,
                workload: _curriculum.workload,
                cred: _curriculum.cred,
                curriculumId: _curriculum.id
            })
        }

        const totalSubjects = course.curriculums.length
        const totalSubjectsDone = subjectsDone.filter(subject => subject.aproved).length
        const percentageDone = (100 * totalSubjectsDone) / totalSubjects
        return res.status(200).json({ msg: "Progressão do curso",course: course.name,  subjectsDone, totalSubjects, totalSubjectsDone, percentageDone })
    } catch (error) {
        console.log({ error })
        return res.status(500).json({ msg: "Algo deu errado, tente novamente mais tarde!" })
    }
}