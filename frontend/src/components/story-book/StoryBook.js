import './StoryBook.css'
import TurnPageButton from '../turn-page-button/turnPageButton';
import Image from '../image/image';
import Story from '../story/Story';

import { useRef } from 'react';

import { useSelector } from 'react-redux'

// import selectAllChapterImages from './storyBookSlice';
// import selectAllChapterTexts from './storyBookSlice';
// import selectRenderChapter from './storyBookSlice';

import { selectAllChapterImages, selectAllChapterTexts, selectRenderChapter } from './storyBookSlice';

// import storyBook from './storyBookSlice';

const StoryBook = (props) => {

  let sysInfo = JSON.parse(localStorage.getItem("sysInfo"))

  // const storyPages = props.storyPages

  // console.log(storyPages)

  const chapterImages = useSelector(selectAllChapterImages)
  const chapterTexts = useSelector(selectAllChapterTexts)
  // const renderChapter = useSelector(selectRenderChapter)

  // console.log(renderChapter)

  // const componentReadBook = useSelector(storyBook)

  // console.log("This is the image URLs from StoryBook component " + chapterImages)

  // console.log(chapterTexts)

  const [renderChapter, setRenderChapter] = props.setRender

  let imgUrl = useRef( renderChapter != -1 ? chapterImages[renderChapter] : "");
  let story = useRef( renderChapter != -1 ? chapterTexts[renderChapter] : "");

  const turnPage = (direct) => {
    if (direct == 'back') {
      // story.current = storyPages["textHistory"][renderChapter -1]
      // imgUrl.current = storyPages["imageHistory"][renderChapter -1]
      // sysInfo["currentPage"] --
      // localStorage.setItem("sysInfo", JSON.stringify(sysInfo))
      // setRenderChapter(renderChapter -1)
    } else if (direct == 'next') {
      // sysInfo["currentPage"] ++
      // localStorage.setItem("sysInfo", JSON.stringify(sysInfo))
      // story.current = storyPages["textHistory"][renderChapter +1]
      // imgUrl.current = storyPages["imageHistory"][renderChapter +1]
      // setRenderChapter(renderChapter +1)
    } else if (direct == 'last') {
      // story.current = storyPages["textHistory"].slice(-1)
      // imgUrl.current = storyPages["imageHistory"].slice(-1)
      // sysInfo["currentPage"] = storyPages["textHistory"].length -1
      // localStorage.setItem("sysInfo", JSON.stringify(sysInfo))
      // setRenderChapter = storyPages["textHistory"][storyPages["textHistory"].length -1]
    }
  }

  console.log("StoryBook rerendered")

  return (
    <>
    {10 < 0 ? (
      <div className="results-container">
        Nothing to Show
      </div>
      ) : (
      <div className="results-container">
        <div className="next-page-container">
          {renderChapter>0 &&
            <TurnPageButton id="previous-page-button" direct="back" label="Previous Chapter" callback={turnPage}/>
          }
        </div>
        <div className="storybook-container">
            <Image link={imgUrl.current} />
            <Story storyString={story.current} />
        </div>
        <div className="next-page-container">
          {  renderChapter != -1 ? renderChapter<0 : false &&
            <TurnPageButton id="next-page-button" direct="next" label="Next Chapter" callback={turnPage}/>
          }
        </div>
      </div>
      )}
   
    </>

  )
}

export default StoryBook;