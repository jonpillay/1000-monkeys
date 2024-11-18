import './StoryText.css';
import ChapterTitle from '../chapter-title/ChapterTitle';

const Story = (props) => {

  return (
    <div className='story-container'>
      <div className='story-text'>{props.storyString}</div>
    </div>
  )
};

export default Story;
