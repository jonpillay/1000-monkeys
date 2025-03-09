import './StoryBookCreate.css'
import TurnPageButton from '../../SharedStoryBookParts/turn-page-button/TurnPageButton';
import Image from '../../SharedStoryBookParts/illustration/illustration';
import Story from '../../SharedStoryBookParts/story-text/StoryText';
import SysInfoPanel from '../../SharedStoryBookParts/sys-info-panel/SysInfoPanel';

import { useRef, useEffect } from 'react';

import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux';

import { selectStoryInProgress, selectCharacter, selectGenre, selectArtStyle, selectFirstChapter, selectGPTPromptHistory, selectSDPromptHistory, setStoryInProgress, setFirstChapter } from '../../Pages/create-stories-page/storyBookSysInfoSlice';
import { selectAllChapterImages, selectAllChapterTexts, selectRenderChapter, reset, nextPage, previousPage } from './storyBookSlice';

// import storyBook from './storyBookSlice';

const StoryBookCreate = (props) => {

  let sysInfo = JSON.parse(localStorage.getItem("sysInfo"))

  const chapterImages = useSelector(selectAllChapterImages)
  const chapterTexts = useSelector(selectAllChapterTexts)
  const genre = useSelector(selectGenre)
  const artStyle = useSelector(selectArtStyle)
  const GPTChatHistory = useSelector(selectGPTPromptHistory)
  const SDPromptHistory = useSelector(selectSDPromptHistory)
  const chapterImgURLs = useSelector(selectAllChapterImages)
  const renderChapter = useSelector(selectRenderChapter)

  const reduxDispatch = useDispatch()

  let genreFont = ''

  if (genre == 'Western') {
    genreFont = 'rye'
  } else if (genre == 'Fairytale') {
    genreFont = 'flavors'
  } else if (genre == 'Cyberpunk') {
    genreFont = 'cynatar'
  } else if (genre == 'Sci-Fi') {
    genreFont = 'major-mono'
  }else if (genre == 'Cyberpunk') {
    genreFont = 'cynatar'
  } else if (genre == 'Dystopian') {
    genreFont = 'phage-rough'
  }

  const userPromptHistory = GPTChatHistory.filter(prompt => prompt['role'] == 'user')
  const userPromptHistoryList = []
  userPromptHistory.forEach(promptObj => userPromptHistoryList.push(promptObj['content']))

  const combinedPrompts = []
  
  if (userPromptHistory && userPromptHistoryList.length == chapterImgURLs.length) {
    userPromptHistoryList.forEach(prompt => {
      const chapterPromptStr = "SYS:\\> User Chapter Prompt = ".concat(prompt)

      let SDPrompt = ""

      if (SDPromptHistory.length == chapterImgURLs.length) {
        const SDPromptInd = combinedPrompts.length
        SDPrompt = SDPromptHistory[SDPromptInd]
  
      } else {
        SDPrompt = "Image Gen Prompt Not Available."
      }

      const SDPromptStr = "SYS:\\> AI Generated Image Prompt = ".concat(SDPrompt)

      const finalPrompt = chapterPromptStr.concat("\n\n").concat(SDPromptStr)

      combinedPrompts.push(finalPrompt)
    });
  }

  const chapterPromptText = useRef(combinedPrompts[renderChapter])

  let imgUrl = chapterImages.length != 0 ? chapterImages[renderChapter] : "";
  let story = chapterTexts.length != 0 ? chapterTexts[renderChapter] : "This is where it ended";

  const turnPage = (direct) => {
    if (direct == 'back') {
      chapterPromptText.current = combinedPrompts[renderChapter - 1]
      reduxDispatch(previousPage())
    } else if (direct == 'next') {
      chapterPromptText.current = combinedPrompts[renderChapter + 1]
      reduxDispatch(nextPage())
    } else if (direct == 'last') {
    }
  }

  return (
    <>
    {chapterImages.length < 0 ? (
      <div className="create-storybook-container">
        Nothing to Show
      </div>
      ) : (
      <>
      <div className="create-storybook-container">
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
          {renderChapter < chapterTexts.length -1 &&
            <TurnPageButton id="next-page-button" direct="next" label="Next Chapter" callback={turnPage}/>
          }
        </div>
      </div>
      <SysInfoPanel genre={genre} genreFont={genreFont} artstyle={artStyle} renderChapter={renderChapter} GPTChatHistory={GPTChatHistory} promptText={chapterPromptText.current}/>
      </>

      )}
   
    </>

  )
}

export default StoryBookCreate;