const mongoose = require('mongoose');

const userSchema = require('./users')
const curriculumSchema = require('./curriculum')
const subjectSchema = require('./subject')
const courseSchema = require('./course')

// Creating model objects
const User = mongoose.model('User', userSchema);
const Curriculum = mongoose.model('Curriculum', curriculumSchema);
const Subject = mongoose.model('Subject', subjectSchema);
const Course = mongoose.model('Course', courseSchema);

 module.exports = { User, Curriculum, Subject, Course }