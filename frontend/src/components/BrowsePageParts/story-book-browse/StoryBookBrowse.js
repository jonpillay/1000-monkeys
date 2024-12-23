// import '../story-book/StoryBook.css'
import './StoryBookBrowse.css'

import TurnPageButton from '../../SharedStoryBookParts/turn-page-button/TurnPageButton';
import Illustration from '../../SharedStoryBookParts/illustration/illustration';
import StoryText from '../../SharedStoryBookParts/story-text/StoryText';
import SysInfoPanel from '../../SharedStoryBookParts/sys-info-panel/SysInfoPanel';

import { useRef } from 'react';

const StoryBookBrowse = (props) => {

  console.log("StoryBookBrowse rerendered")
  
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
  const GPTChatHistory = props.GPTChatHistory
  const SDPromptHistory = props.SDPromptHistory

  const userPromptHistory = GPTChatHistory.filter(prompt => prompt['role'] == 'user')
  const userPromptHistoryList = []
  userPromptHistory.forEach(promptObj => userPromptHistoryList.push(promptObj['content']))

  const combinedPrompts = []

  console.log(userPromptHistory)

  if (userPromptHistory && userPromptHistoryList.length == chapterImgURLs.length) {
    userPromptHistoryList.forEach(prompt => {
      const chapterPromptStr = "SYS:\\> User Chapter Prompt = ".concat(prompt)

      let SDPrompt = ""

      if (SDPromptHistory.length == chapterImgURLs.length) {
        const SDPromptInd = combinedPrompts.length
        console.log(typeof SDPromptInd)
        SDPrompt = SDPromptHistory[SDPromptInd]
  
      } else {
        SDPrompt = "Image Gen Prompt Not Available."
      }

      const SDPromptStr = "SYS:\\> AI Generated Image Prompt = ".concat(SDPrompt)

      const finalPrompt = chapterPromptStr.concat("\n\n").concat(SDPromptStr)

      combinedPrompts.push(finalPrompt)
    });
  }

  const genre = props.genre
  const character = props.character
  const artStyle = props.artStyle

  const genreFont = props.genreFont

  let imgUrl = useRef(chapterImgURLs[renderChapter] || "");
  let story = useRef(chapterTexts[renderChapter] || "");

  const chapterPromptText = useRef(combinedPrompts[renderChapter])

  const localPageNumbers = JSON.parse(localStorage.getItem('browsePageNumbers')) || {}

  const turnPage = async (direct) => {
    if (direct == 'previous') {
      story.current = chapterTexts[renderChapter -1]
      imgUrl.current = chapterImgURLs[renderChapter -1]
      chapterPromptText.current = combinedPrompts[renderChapter - 1]
      localPageNumbers[id] -= 1
      localStorage.setItem('browsePageNumbers', JSON.stringify(localPageNumbers))
      setRenderChapter(renderChapter -1)
    } else if (direct == 'next') {
      story.current = chapterTexts[renderChapter +1]
      imgUrl.current = chapterImgURLs[renderChapter +1]
      chapterPromptText.current = combinedPrompts[renderChapter + 1]
      console.log(userPromptHistory)
      localPageNumbers[id] += 1
      localStorage.setItem('browsePageNumbers', JSON.stringify(localPageNumbers))
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
    <>
      <div className="storybook-browse-container">
        <div className="next-page-container">
          {renderChapter>0 &&
            <TurnPageButton id="previous-page-button" direct="previous" label="Previous Chapter" callback={turnPage}/>
          }
        </div>
        <div className="storybook-container">
            <Illustration link={imgUrl.current} />
            <StoryText chapterNumber={renderChapter + 1} storyString={story.current} />
        </div>
        <div className="next-page-container">
          {renderChapter<chapterTexts.length-1 &&
            <TurnPageButton id="next-page-button" direct="next" label="Next Chapter" callback={turnPage}/>
          }
        </div>
      </div>
      <SysInfoPanel genre={genre} genreFont={genreFont} artstyle={artStyle} renderChapter={renderChapter} GPTChatHistory={GPTChatHistory} promptText={chapterPromptText.current}/>
    </>
  )
}

export default StoryBookBrowse;