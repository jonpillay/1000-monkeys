import './image.css';

const Image = ({link}) => {
  return (
    <div>
      <img className='story-image' src={ link } alt='story' />
    </div>
  )
}

export default Image;