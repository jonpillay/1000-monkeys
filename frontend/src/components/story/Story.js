import './Story.css';

const Story = ({storyString}) => {
  return (
    <div className='story-container'>
      <p className='story-text-para'>{storyString}</p>
    </div>
  )
};

export default Story;
