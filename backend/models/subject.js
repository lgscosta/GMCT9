
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    userId: String,
    aproved: Boolean,
    curriculumId: String,
  });

  module.exports = subjectSchema
