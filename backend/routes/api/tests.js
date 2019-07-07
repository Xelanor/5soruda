const router = require('express').Router();
const mongoose = require('mongoose')

let Test = require('../../models/Test');
let User = require('../../models/User')

router.route('/').get((req, res) => {
  Test.find()
    .populate('questions.question')
    .exec()
    .then(tests => res.json(tests))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const test = new Test({
    _id: mongoose.Types.ObjectId(),
    givenAnswers: req.body.givenAnswers,
    questions: req.body.questions
  })
  test
    .save()
    .then(test => res.json(test))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add-test-to-user').post((req, res) => {
  User.findByIdAndUpdate(req.body.id, { $push: { tests: req.body.test } })
    .then(() => res.json('Test added to User!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
  Test.findById(req.params.id)
    .then(test => res.json(test))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update-answers/:id').post((req, res) => {
  Test.findByIdAndUpdate(req.params.id, { $set: { givenAnswers: req.body.updatedGivenAnswers } })
    .then(() => res.json('Test Updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
