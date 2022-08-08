const models = require('../models')
const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => {
    const body = req.body
    if (Object.keys(body).length === 0) return res.status(400).json({ message: "Campos obrigatórios" })

    const { username, name, password, confirmPassword, email } = body


    if (!email) return res.status(422).json({ message: "E-mail é obrigatório" })
    if (!username) return res.status(422).json({ message: "Usuário é obrigatório" })
    if (!password) return res.status(422).json({ message: "Senha é obrigatório" })
    if (!name) return res.status(422).json({ message: "Nome é obrigatório" })
    if (!confirmPassword) return res.status(422).json({ message: "A confirmação de senha é obrigatório" })

    if (password !== confirmPassword) return res.status(422).json({ message: 'A confirmação de senha nao bate com a senha' })

    // Verificando se o email ja existe
    const userExist = await models.User.findOne({ email })
    if (userExist) return res.status(422).json({ message: "E-mail já cadastrado" })

    // Criando a senha encriptada
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)


    // Criando usuário
    const user = new models.User({
        name,
        password: passwordHash,
        username,
        email
    });
    try {
        
        await user.save()
        res.status(201).json({ message: "Usuário criado com sucesso" })
    } catch (error) {
        console.log({ error })
        return res.status(500).json({ message: "Algo deu errado, tente novamente mais tarde!" })
    }
}

exports.listUsers = async (req, res) => {

    const users = await models.User.find({}, '-password')
    
    return res.status(200).send({ message: " lista de usuários", users })
}

exports.listUserById = async (req, res) => {
    const id = req.params.id

    try {
        const user = await models.User.findById(id, '-password')
        console.log(!user)
        return res.status(200).send({ message: "Dados do usuários", user })
        
    } catch (error) {
        console.log({error})
        return res.status(404).json({ msg: 'Usuário não encontrado'})
        
    }

    
    
}
