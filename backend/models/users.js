const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    username: String,
    courseInital: String,
  });

  module.exports = userSchema
