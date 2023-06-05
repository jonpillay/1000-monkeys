import './image.css';

const Image = ({link}) => {
  return (
    <div className='story'>
      <img className='story-image' src={ link } alt='story' />
    </div>
  )
}

export default Image;