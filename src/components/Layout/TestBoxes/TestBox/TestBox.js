import React from 'react';
import { Link } from 'react-router-dom';

import './TestBox.css'
import { ComplicationRate } from '../../../Utils/PerformanceEvaluation'

const testBox = (props) => {
  return (
    <div className="TestBox">
      <p>Başlangıç tarihi: {props.test.createdAt.substring(0, 10)}</p>
      <p>Bitirme Miktarı: <ComplicationRate givenAnswers={props.test.givenAnswers} /></p>
      <p><Link to={"/test-goruntule/" + props.test._id}>Testi Görüntüle</Link></p>
      <p><Link to={"/test/" + props.test._id}>Devam Et</Link></p> {/* ToDO */}
    </div >
  );
}

export default testBox;