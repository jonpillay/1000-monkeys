import './Story.css';
import ChapterTitle from '../chapter-title/ChapterTitle';

const Story = (props) => {

  return (
    <div className='story-container'>
      <ChapterTitle chapterNumber={props.chapterNumber}/>
      <div className='story-text'>{props.storyString}</div>
    </div>
  )
};

export default Story;
