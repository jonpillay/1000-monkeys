import React from 'react';
import './Story.css';

const Story = ({storyString}) => {
  console.log("Story rerendered")

  return (
    <div className='story-container'>
      <p className='story-text-para'>{storyString}</p>
    </div>
  )
};

export default Story;
