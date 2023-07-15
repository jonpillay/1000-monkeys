import React from 'react';
import './Story.css';

const Story = (props) => {
  console.log("Story rerendered")

  return (
    <div className='story-container'>
      <p className='story-text-para'>{props.storyString}</p>
    </div>
  )
};

export default Story;
