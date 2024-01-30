import './StoryBook.css'
import TurnPageButton from '../turn-page-button/turnPageButton';
import Image from '../image/image';
import Story from '../story/Story';

import { useRef, useEffect } from 'react';

import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux';

import { selectAllChapterImages, selectAllChapterTexts, selectRenderChapter, reset } from './storyBookSlice';

import { clearReduxPersist } from '../../redux-state/store';

// import storyBook from './storyBookSlice';

const StoryBook = (props) => {

  // const handleStoryBookUnmount = () => {
  //   clearReduxPersist()
  // }

  // useEffect (() => {
  //   return () => {
  //     handleStoryBookUnmount()
  //   } 
  // }, []);

  let sysInfo = JSON.parse(localStorage.getItem("sysInfo"))

  const chapterImages = useSelector(selectAllChapterImages)
  const chapterTexts = useSelector(selectAllChapterTexts)

  const [renderChapter, setRenderChapter] = props.setRender

  console.log(chapterImages)

  let imgUrl = useRef( renderChapter != -1 ? chapterImages[renderChapter] : "");
  let story = useRef( renderChapter != -1 ? chapterTexts[renderChapter] : "");

  const turnPage = (direct) => {
    if (direct == 'back') {
    } else if (direct == 'next') {
    } else if (direct == 'last') {
    }
  }

  console.log("StoryBook rerendered")

  return (
    <>
    {chapterImages <= 0 ? (
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