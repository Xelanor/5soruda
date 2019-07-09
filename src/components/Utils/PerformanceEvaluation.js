import React from 'react';

export const ComplicationRate = (props) => {
  let questionCount = 0
  let answeredCount = 0
  Object.keys(props.givenAnswers)
    .map(key => {
      if (props.givenAnswers[key] !== null) {
        answeredCount += 1
      }
      questionCount += 1
    })
  const rate = answeredCount / questionCount * 100
  return (
    <div>
      <p>{questionCount} sorudan {answeredCount} tanesini çözdün. <strong>%</strong>{rate}</p>
    </div>
  );
}

export const TestResult = (props) => {
  let rightAnswers = 0
  let wrongAnswers = 0
  console.log(props.questions)
  Object.keys(props.givenAnswers)
    .map(key => {
      if (props.givenAnswers[key] === props.questions[+key - 1].question.rightAnswer) {
        rightAnswers += 1
      } else {
        wrongAnswers += 1
      }
    })
  let questionCount = rightAnswers + wrongAnswers
  return (
    <div className="center">
      <h5>Performans Değerlendirmesi</h5>
      <p><strong>Toplam Soru Sayısı: </strong>{rightAnswers + wrongAnswers}</p>
      <p><strong>Doğru Çözülen Soru Sayısı: </strong>{rightAnswers}</p>
      <p><strong>Yanlış Çözülen Soru Sayısı: </strong>{wrongAnswers}</p>
      <p>Başarı Oranı: %{rightAnswers / questionCount * 100}</p>
    </div>
  );
}