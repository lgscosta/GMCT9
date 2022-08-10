const mongoose = require('mongoose');

const curriculumSchema = new mongoose.Schema({
    nameSubject: String,
    cod: String,
    workload: Number,
    cred: Number
  });

  module.exports = curriculumSchema
