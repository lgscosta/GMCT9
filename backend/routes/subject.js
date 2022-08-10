const models = require('../models')

exports.createSubject = async (req, res) => {

    const { aproved = false, curriculumId } = req.body

    if (!curriculumId) return res.status(422).json({ msg: "A matéria é obrigatório" })


    
    const subjectExist = await models.Subject.findOne({ curriculumId, userId: req.userId })
    
    if (subjectExist) {
        try {
            subjectExist.aproved = aproved
            subjectExist.save();
            return res.status(200).json({ msg: "Matéria vinculada com sucesso!" })
        } catch (error) {
            console.log({ error })            
            return res.status(500).json({ msg: "Algo deu errado, tente novamente mais tarde!" })
        }
    }
    const subject = new models.Subject({
        userId: req.userId,
        aproved,
        curriculumId,
    });

    try {
        subject.save()
        return res.status(200).json({ msg: "Matéria vinculada com sucesso!" })
    } catch (error) {
        console.log({ error })
        return res.status(500).json({ msg: "Algo deu errado, tente novamente mais tarde!" })
    }

}

exports.listSubject = async (req, res) => {
    try {
        const subjects = await models.Subject.find({ userId: req.userId })
        const subjectArray = []
        for (subject of subjects) {
            const curriculum = await models.Curriculum.findById(subject.curriculumId)
            subjectArray.push({
                nameSubject: curriculum.nameSubject,
                cod: curriculum.cod,
                workload: curriculum.workload,
                cred: curriculum.cred,
                aproved: subject.aproved,
                userId: subject.userId
            })
        }
        return res.status(200).json({ msg: "Matérias vinculadas", data: subjectArray })
    } catch (error) {
        console.log({ error })
        return res.status(500).json({ msg: "Algo deu errado, tente novamente mais tarde!" })
    }
}
