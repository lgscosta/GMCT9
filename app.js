const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
require('dotenv').config();

app.use(bodyParser.json());

const init_db = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@gmct9cluster.nix2w8h.mongodb.net/?retryWrites=true&w=majority`);
}

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    username: { type: String,
        unique: true}
  });

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/user', (req, res) => {

    const body = req.body
    if (Object.keys(body).length === 0) return res.status(400).json({ message: "Não foi enviado nada no body" }) 

    const { username, name, password } = body


    if (username === undefined || password === undefined || name === undefined) return res.status(400).json({ message: "UserName, senha e nome são obrigatórios"})

    const newUser = new User({ name, password, username });
    newUser.save()
    console.log({ newUser })
    res.status(201).json({ message: "Usuário criado com sucesso" })
})

app.get('/user',  (req, res) => {
    User.find().then(data => {
        console.log({ data })
        return  res.status(200).send({ message: " lista de usuários", data})
    }).catch(error => res.status(500).send({ message: "erro ao resgatar a lista de usuários"}))
})

app.get('/user/:id',  (req, res) => {
    User.findById(req.params.id).then(data => {
        console.log({ data })
        return  res.status(200).send({ message: "Dados do usuários", data})
    }).catch(error => res.status(500).send({ message: "erro ao resgatar a lista de usuários"}))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    init_db().then(() => console.log('Deu sucesso')).catch(error => console.log({ error }))
})