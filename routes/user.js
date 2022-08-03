exports.createUser = (req, res) => {
    const body = req.body
    if (Object.keys(body).length === 0) return res.status(400).json({ message: "Não foi enviado nada no body" }) 

    const { username, name, password } = body


    if (username === undefined || password === undefined || name === undefined) return res.status(400).json({ message: "UserName, senha e nome são obrigatórios"})

    const newUser = new User({ name, password, username });
    newUser.save()
    console.log({ newUser })
    res.status(201).json({ message: "Usuário criado com sucesso" })
}

exports.listUsers =  (req, res) => {
    User.find().then(data => {
        console.log({ data })
        return  res.status(200).send({ message: " lista de usuários", data})
    }).catch(error => res.status(500).send({ message: "erro ao resgatar a lista de usuários"}))
}

exports.listUserById =  (req, res) => {
    User.findById(req.params.id).then(data => {
        console.log({ data })
        return  res.status(200).send({ message: "Dados do usuários", data})
    }).catch(error => res.status(500).send({ message: "erro ao resgatar a lista de usuários", error}))
}