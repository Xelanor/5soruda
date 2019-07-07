const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  subject: {
    type: String,
    required: true,
  },
  lesson: {
    type: String,
    required: true,
  },
  answers: {
    type: Map,
    of: String
  },
  rightAnswer: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: false
  },
  image: {
    type: String,
    required: false,
  },
  video: {
    type: String,
    required: false
  },
  exam: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true
  }
}, {
    timestamps: true,
  })

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;