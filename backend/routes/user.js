const models = require('../models')
const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => {
    const body = req.body
    if (Object.keys(body).length === 0) return res.status(400).json({ msg: "Campos obrigatórios" })

    const { username, name, password, confirmPassword, email, courseInital = "CCOMP" } = body


    if (!email) return res.status(422).json({ msg: "E-mail é obrigatório" })
    if (!username) return res.status(422).json({ msg: "Usuário é obrigatório" })
    if (!password) return res.status(422).json({ msg: "Senha é obrigatório" })
    if (!name) return res.status(422).json({ msg: "Nome é obrigatório" })
    if (!courseInital) return res.status(422).json({ msg: "A inicial do curso é obrigatório" })
    if (!confirmPassword) return res.status(422).json({ msg: "A confirmação de senha é obrigatório" })

    if (password !== confirmPassword) return res.status(422).json({ msg: 'A confirmação de senha nao bate com a senha' })

    // Verificando se o email ja existe
    const userExist = await models.User.findOne({ email })
    if (userExist) return res.status(422).json({ msg: "E-mail já cadastrado" })

    // Criando a senha encriptada
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)


    // Criando usuário
    const user = new models.User({
        name,
        password: passwordHash,
        username,
        email,
        courseInital
    });
    try {
        
        await user.save()
        res.status(201).json({ msg: "Usuário criado com sucesso" })
    } catch (error) {
        console.log({ error })
        return res.status(500).json({ msg: "Algo deu errado, tente novamente mais tarde!" })
    }
}

exports.listUsers = async (req, res) => {

    const users = await models.User.find({}, '-password')
    
    return res.status(200).send({ msg: " lista de usuários", users })
}

exports.listUserById = async (req, res) => {
    const id = req.params.id

    try {
        const user = await models.User.findById(id, '-password')
        console.log(!user)
        return res.status(200).send({ msg: "Dados do usuários", user })
        
    } catch (error) {
        console.log({error})
        return res.status(404).json({ msg: 'Usuário não encontrado'})
        
    }

    
    
}


exports.updateUser = async (req, res) => {
    const user = await models.User.findById(req.params.id)
    const { username, name, email, courseInital } = req.body
    if (email) {
        const emailExist = await models.User.findOne({ email})     
      
        if ( emailExist && user.email !== email ) return res.status(422).json({ msg: 'E-mail já cadastrado'})
        user.email = email
    }
    if (username) user.username = username
    if (name) user.name = name
    if (courseInital) user.courseInital = courseInital
        try {
            user.save()
            return res.status(200).json({ msg: 'Usuário atualizado com sucesso!'})
        } catch (error) {
            console.log({ error })
            return res.status(500).json({ msg: "Algo deu errado, tente novamente mais tarde!" })
        }
}