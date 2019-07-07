import React from 'react';

const complicationRate = (props) => {
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

export default complicationRate;