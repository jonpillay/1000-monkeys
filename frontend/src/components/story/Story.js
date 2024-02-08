import './Story.css';

const Story = (props) => {
  console.log("Story rerendered")

  return (
    <div className='story-container'>
      <div className='story-text'>{props.storyString}</div>
    </div>
  )
};

export default Story;
