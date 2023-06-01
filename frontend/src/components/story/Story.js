import './Story.css';

const Story = ({storyString}) => {
  return (
    <div>
      <p className='story-text'>{storyString}</p>
    </div>
  )
};

export default Story;
