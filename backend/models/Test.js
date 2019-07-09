const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testSchema = new Schema({
  questions: [{
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    questionNumber: {
      type: String,
      required: true
    },
  }],
  givenAnswers: {
    type: Map,
    of: String
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
}, {
    timestamps: true,
  })

const Test = mongoose.model('Test', testSchema);

module.exports = Test;