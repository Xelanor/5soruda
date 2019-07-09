import React from 'react';

import AnswerButton from './AnswerButton/AnswerButton'

const question = (props) => {
  let disabled = false
  let currentQuestion
  let answers
  let questionCount = props.questionNumber


  for (let i in props.questions) {
    if (parseInt(props.questions[i].questionNumber) === questionCount) {
      currentQuestion = props.questions[i].question
    }
  }
  if (props.questionNumber <= Object.keys(props.questions).length) {
    answers = Object.keys(currentQuestion.answers).map(answer => {
      let classN
      if (props.givenAnswers[questionCount] !== null) {
        console.log(currentQuestion)

        if (props.givenAnswers[questionCount] === currentQuestion.rightAnswer && currentQuestion.rightAnswer === answer) {
          classN = "success"
        }
        else {
          if (currentQuestion.rightAnswer === answer) {
            classN = "success"
          } else if (props.givenAnswers[questionCount] === answer) {
            classN = "fail"
          }
        }
        disabled = true
      }

      return (
        <AnswerButton
          key={answer}
          content={currentQuestion.answers[answer]}
          clicked={() => props.answerClicked(answer)}
          class={classN}
          disabled={disabled} />)
    })
  }
  let nextQuestionButton = null
  let prevQuestionButton = null
  let watchVideo = null
  if (props.givenAnswers[questionCount] !== null) {
    nextQuestionButton = <button onClick={props.nextQuestion}>Sonraki Soru</button>
    prevQuestionButton = <button onClick={props.prevQuestion}>Önceki Soru</button>
    watchVideo = <div>
      <h4>Hemen Sorunun Cevabını İzleyin</h4>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/dpODFLDEXWw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  }
  let content = null
  if (props.questionNumber <= Object.keys(props.questions).length) {
    content =
      <React.Fragment>
        <h5>Demo'ya Hoşgeldiniz.</h5>
        <h6><strong>Soru No: </strong>{props.questionNumber}</h6>
        <h6><strong>Sorunun Değeri: </strong>{currentQuestion.value}</h6>
        <p> <strong>Konu: </strong>{currentQuestion.subject}</p>
        {nextQuestionButton}
        {prevQuestionButton}
        <div className="content">
          {currentQuestion.content}
        </div>
        {answers}
        {watchVideo}
      </React.Fragment>
  }

  return (
    <div className="container">
      {content}
    </div>
  );
}

export default question;