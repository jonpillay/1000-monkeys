import './ChapterTitle.css';

const ChapterTitle = (props) => {
  return (
    <div className="chapter-title-container">
      <div className="chapter-title">
        Chapter {props.chapterNumber}
        {props.AIEngine}
      </div>
    </div>
  )
}

export default ChapterTitle;