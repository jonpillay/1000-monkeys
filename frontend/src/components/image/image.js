import React from 'react';
import './image.css';

const Image = ({link}) => {
  console.log("Image rerendered")

  return (
    <div className='story'>
      <img className='story-image' src={ link } alt='story' />
    </div>
  )
};

export default Image;