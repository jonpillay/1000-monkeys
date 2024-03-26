// import '../story-book/StoryBook.css'
import './StoryBookBrowse.css'

import TurnPageButton from '../turn-page-button/turnPageButton';
import Image from '../image/image';
import Story from '../story/Story';

import { useRef } from 'react';

const StoryBookBrowse = (props) => {
  
  /*
  Needs to fetch only the local storage info related to its own instance (current page number). 
  With different books rendered on the same page, will need to be referenced by its own key.
  Should setup localStorage object to handle every time the page renders a new list of books? 
  */

  const id = props.id

  const chapterTexts = props.chapterTexts

  const chapterImgURLs = props.chapterImgURLs

  const setRenderChapter = props.setRender

  const renderChapter = props.renderChapter

  let imgUrl = useRef(chapterImgURLs[renderChapter] || "");
  let story = useRef(chapterTexts[renderChapter] || "");

  /*
  Turnpage here needs to be rewritten to handle the new localStorage object.
  */

  const localPageNumbers = JSON.parse(localStorage.getItem('browsePageNumbers')) || {}

  console.log(localPageNumbers)

  const turnPage = async (direct) => {
    if (direct == 'back') {
      story.current = chapterTexts[renderChapter -1]
      imgUrl.current = chapterImgURLs[renderChapter -1]
      localPageNumbers[id] -= 1
      await localStorage.setItem('browsePageNumbers', JSON.stringify(localPageNumbers))
      setRenderChapter(renderChapter -1)
    } else if (direct == 'next') {
      story.current = chapterTexts[renderChapter +1]
      imgUrl.current = chapterImgURLs[renderChapter +1]
      localPageNumbers[id] += 1
      await localStorage.setItem('browsePageNumbers', JSON.stringify(localPageNumbers))
      setRenderChapter(renderChapter +1)
    }
    // } else if (direct == 'last') {
    //   story.current = storyPages["textHistory"].slice(-1)
    //   imgUrl.current = storyPages["imageHistory"].slice(-1)
    //   sysInfo["currentPage"] = storyPages["textHistory"].length -1
    //   localStorage.setItem("sysInfo", JSON.stringify(sysInfo))
    //   setRenderChapter = storyPages["textHistory"][storyPages["textHistory"].length -1]
    // }
  }

  return (
    <div className="results-container">
      <div className="next-page-container">
        {renderChapter>0 &&
          <TurnPageButton id="previous-page-button" direct="back" label="Previous Chapter" callback={turnPage}/>
        }
      </div>
      <div className="storybook-container">
          <Image link={imgUrl.current} />
          <Story chapterNumber={renderChapter + 1} storyString={story.current} />
      </div>
      <div className="next-page-container">
        {renderChapter<chapterTexts.length-1 &&
          <TurnPageButton id="next-page-button" direct="next" label="Next Chapter" callback={turnPage}/>
        }
      </div>
    </div>
  )
}

export default StoryBookBrowse;