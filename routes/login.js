const models = require("../models")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    const { email, password} = req.body

    if (!email) return res.status(422).json({ message: "E-mail é obrigatório!" })
    if (!password) return res.status(422).json({ message: "Senha é obrigatório!" })
    // Verificando se o usuário existe
    const user = await models.User.findOne({ email })
    if (!user) return res.status(422).json({ message: "E-mail não cadastrado!" })

    // Verificando se a senha bate
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) return res.status(422).json({ message: "Senha incorreta!" })


    try {
        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user._id,
            email: user.email,
            name: user.name
        }, secret)
        return res.status(200).json({ msg: "Autenticação realizada com sucesso!!", token})
    } catch (error) {
        console.log({ error })
        return res.status(500).json({ message: "Algo deu errado, tente novamente mais tarde!" })
    }

}

