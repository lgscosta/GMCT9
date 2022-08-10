const express = require('express')
const router = express.Router()
const checkToken = require("../middlewares/checkToken")
const user = require('./user')
const login = require('./login')
const curriculum = require('./curriculum')
const subject = require('./subject')
const course = require('./course')
const menu = require('./menu')

// users
router.get('/user', checkToken, user.listUsers)
router.get('/user/:id',checkToken, user.listUserById)
router.post('/user', user.createUser)
router.put('/user/:id', user.updateUser)
// login
router.post('/login', login.login)
router.get('/isAuthenticate', login.isAuthenticate)
// Materias
router.post('/subject', checkToken,  subject.createSubject)
router.get('/subject', checkToken,  subject.listSubject)
// Curso
router.post('/course', checkToken, course.createCourse)
router.get('/course', checkToken, course.listCourses)
router.put('/course/:id', checkToken, course.updateCourse)
router.get('/mycourse', checkToken, course.myCourse )
// matriz curricular
router.post('/curriculum', checkToken, curriculum.createCurriculum)
router.get('/curriculum', checkToken, curriculum.listCurriculum)
// menu
router.get('/menu', menu.gatherData)
router.get('/menu/:university', menu.gatherData)

router.get('/', (req, res) => {
    return res.send('Essa pagina é a home')
})


module.exports = router