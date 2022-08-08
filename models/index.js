const mongoose = require('mongoose');

const userSchema = require('./users')

// Creating model objects
const User = mongoose.model('User', userSchema);

 module.exports = {User}