
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: String,
    initial: String,
    curriculums: Array
  });

  module.exports = subjectSchema
