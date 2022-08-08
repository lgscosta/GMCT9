const express = require('express')
const router = express.Router()
const checkToken = require("../middlewares/checkToken")
const user = require('./user')
const login = require('./login')

// users
router.get('/user', checkToken, user.listUsers)
router.get('/user/:id',checkToken, user.listUserById)
router.post('/user', user.createUser)
// login
router.post('/login', login.login)
// Materias
router.get('/', (req, res) => {
    return res.send('Essa pagina é a home')
})


module.exports = router