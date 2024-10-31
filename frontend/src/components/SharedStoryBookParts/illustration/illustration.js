import React from 'react';
import './illustration.css';

const Image = React.memo(({link}) => {

  return (
    <div className='image-container'>
      <img className='story-image' src={ link } alt='story' />
    </div>
  )
});

export default Image;