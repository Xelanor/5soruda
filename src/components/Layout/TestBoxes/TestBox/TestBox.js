import React from 'react';

import './TestBox.css'
import ComplicationRate from '../../../Utils/PerformanceEvaluation'

const testBox = (props) => {
  return (
    <div className="TestBox">
      <p>Başlangıç tarihi: {props.tests.createdAt.substring(0, 10)}</p>
      <p>Bitirme Miktarı: <ComplicationRate givenAnswers={props.tests.givenAnswers} /></p>
    </div >
  );
}

export default testBox;