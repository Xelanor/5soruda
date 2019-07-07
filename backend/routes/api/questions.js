const router = require('express').Router();
let Question = require('../../models/Question');

router.route('/').get((req, res) => {
  Question.find()
    .then(questions => res.json(questions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const content = req.body.content;
  const value = Number(req.body.value);
  const subject = req.body.subject;
  const lesson = req.body.lesson;
  const answers = req.body.answers;
  const rightAnswer = req.body.rightAnswer;
  const duration = Number(req.body.duration);
  const image = req.body.image;
  const video = req.body.video;
  const exam = req.body.exam;
  const type = req.body.type;

  const newQuestion = new Question({
    content,
    value,
    subject,
    lesson,
    answers,
    rightAnswer,
    duration,
    image,
    video,
    exam,
    type
  });

  newQuestion.save()
    .then(() => res.json('Question added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Question.findById(req.params.id)
    .then(test => res.json(test))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;