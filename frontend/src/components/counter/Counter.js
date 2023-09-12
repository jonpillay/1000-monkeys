import React from 'react';
import './Counter.css';

const Counter = (props) => {
  console.log("Coutner rerendered")

  return (
    <div className='counter-container'>
      <div className='minutes'>10</div>
      <div className='colon'>:</div>
      <div className='seconds'>10</div>
    </div>
  )
};

export default Counter;