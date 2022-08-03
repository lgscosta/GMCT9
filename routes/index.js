const express = require('express');
const users = require('./user');

const router = express.Router();

// Users routes
router.get('/users', users.listUsers);
router.get('/users/:id', users.listUserById);
router.post('/users', users.createUser);

//index
router.get('/', (req, res) => {
    res.send('Hello World!')
  })

module.exports = router;