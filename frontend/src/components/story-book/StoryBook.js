import './StoryBook.css'
import TurnPageButton from '../turn-page-button/turnPageButton';
import Image from '../image/image';
import Story from '../story/Story';

import { useRef, useEffect } from 'react';

import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux';

import { selectAllChapterImages, selectAllChapterTexts, selectRenderChapter, reset, nextPage, previousPage } from './storyBookSlice';

import { clearReduxPersist } from '../../redux-state/store';

// import storyBook from './storyBookSlice';

const StoryBook = (props) => {

  let sysInfo = JSON.parse(localStorage.getItem("sysInfo"))

  const chapterImages = useSelector(selectAllChapterImages)
  const chapterTexts = useSelector(selectAllChapterTexts)

  const renderChapter = useSelector(selectRenderChapter)

  const reduxDispatch = useDispatch()

  // useEffect (() => {
  // }, [renderChapter])

  let imgUrl = chapterImages.length != 0 ? chapterImages[renderChapter] : "";
  let story = chapterImages.length != 0 ? chapterTexts[renderChapter] : "This is where it ended";

  const turnPage = (direct) => {
    if (direct == 'back') {
      reduxDispatch(previousPage())
    } else if (direct == 'next') {
      reduxDispatch(nextPage())
    } else if (direct == 'last') {
    }
  }

  console.log("StoryBook rerendered")

  return (
    <>
    {chapterImages.length < 0 ? (
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
            <Image link={imgUrl} />
            <Story storyString={story} />
        </div>
        <div className="next-page-container">
          {  renderChapter < chapterTexts.length -1 &&
            <TurnPageButton id="next-page-button" direct="next" label="Next Chapter" callback={turnPage}/>
          }
        </div>
      </div>
      )}
   
    </>

  )
}

export default StoryBook;