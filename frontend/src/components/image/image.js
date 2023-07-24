import React from 'react';
import './image.css';

const Image = React.memo(({link}) => {
  console.log("Image rerendered")

  return (
    <div className='image-container'>
      <img className='story-image' src={ link } alt='story' />
    </div>
  )
});

export default Image;