import React from 'react';

import './AnswerButton.css'

const answerButton = (props) => {

  return (
    <button
      className={[props.class, "answerButton"].join(" ")}
      onClick={props.clicked}
      disabled={props.disabled} >
      {props.content}
    </button>
  );
}

export default answerButton;