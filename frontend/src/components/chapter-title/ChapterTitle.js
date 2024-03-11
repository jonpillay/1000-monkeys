import './ChapterTitle.css';

import { useSelector } from 'react-redux';
import { selectRenderChapter } from '../story-book/storyBookSlice';

const ChapterTitle = () => {

  const chapterNumber = useSelector(selectRenderChapter)

  return (
    <div className="chapter-title-container">
      <div className="chapter-title">
        Chapter {chapterNumber + 1}
      </div>
    </div>
  )
}

export default ChapterTitle;