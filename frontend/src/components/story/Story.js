import './Story.css';
import ChapterTitle from '../chapter-title/ChapterTitle';

const Story = (props) => {
  console.log("Story rerendered")

  return (
    <div className='story-container'>
      <ChapterTitle/>
      <div className='story-text'>{props.storyString}</div>
    </div>
  )
};

export default Story;
