const models = require('../models')

exports.createCurriculum =  async (req, res) => {

    const {  nameSubject, cod, workload, cred  } = req.body

    if (!nameSubject) return res.status(422).json({ msg: "O nome da matéria é obrigatório" })
    if (!cod) return res.status(422).json({ msg: "O codigo da matéria é obrigatório" })
    if (!workload) return res.status(422).json({ msg: "A carga horária da matéria é obrigatório" })
    if (!cred) return res.status(422).json({ msg: "A Coeficente de rendimento da matéria é obrigatório" })

    const curriculumExist = await models.Curriculum.findOne({ cod })

    if (curriculumExist) return res.status(422).json({ msg: "Matéria já cadastrada!"})

    const curriculum = new models.Curriculum({
        nameSubject,
        cod,
        workload,
        cred
    });

    try {
        curriculum.save()
        res.status(200).json({ msg: "Matéria criada com sucesso!"})
        
    } catch (error) {
        console.log({ error })
        return res.status(500).json({ msg: "Algo deu errado, tente novamente mais tarde!" })
    }

}


exports.listCurriculum = async (req, res) => {
    try {
        const curriculum = await models.Curriculum.find()
        return res.status(200).json({ msg: "Matérias cadastradas", data: curriculum })
    } catch (error) {
        console.log({ error })
        return res.status(500).json({ msg: "Algo deu errado, tente novamente mais tarde!" })
    }
}