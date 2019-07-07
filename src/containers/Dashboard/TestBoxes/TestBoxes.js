import React from 'react';

import TestBox from './TestBox/TestBox'
import './TestBoxes.css'

const testBoxes = (props) => {
  let testBoxes = Object.keys(props.data)
    .map(test => {
      return <TestBox key={props.data[test]._id} tests={props.data[test]} />
    })
  return (
    <React.Fragment>
      {testBoxes}
    </React.Fragment>
  );
}

export default testBoxes;