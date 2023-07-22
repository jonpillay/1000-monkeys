import React from 'react';
import './Story.css';

const Story = (props) => {
  console.log("Story rerendered")

  return (
    <div className='story-text'>{props.storyString}</div>
  )
};

export default Story;
