import React from 'react';

import './TestBox.css'

const testBox = (props) => {
  console.log(props.tests)
  return (
    <div className="TestBox">
      <p>Başlangıç tarihi: {props.tests.createdAt}</p>
      <p>Başlangıç tarihi: {props.tests.createdAt}</p>
    </div>
  );
}

export default testBox;