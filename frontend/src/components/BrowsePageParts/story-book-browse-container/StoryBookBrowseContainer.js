import './StoryBookBrowseContainer.css'

import { useState, useEffect, useRef } from "react";

import StoryBookBrowse from '../story-book-browse/StoryBookBrowse';
import StoryBookBrowseInfoPanel from '../storybook-browse-info-panel/StoryBookBrowseInfoPanel';
import SysInfoPanel from '../../SharedStoryBookParts/sys-info-panel/SysInfoPanel';

import { useAuthContext } from '../../../hooks/useAuthContext';


const StoryBookBrowseContainer = (props) => {

  /*

  Needs a useEffect to load in the current page number in relation to the object key

  */

  // useEffect(() => {
    
  // })

  const {user} = useAuthContext()

  const bookID = props.bookID

  const authorID = props.authorID

  const currentUser = user

  const title = props.title

  const author = props.author
  
  const chapterTexts = props.chapterTexts

  const chapterImgURLs = props.chapterImgURLs

  const startingPage = props.pageNumber

  const character = props.character

  const artstyle = props.artstyle

  const genre = props.genre

  const AIEngine = props.AIEngine

  const ratings = props.ratings

  const [renderChapter, setRenderChapter] = useState(startingPage)

  const GPTChatHistory = props.GPTChatHistory

  const [chapterPromptText, setChapterPromptText] = useState(GPTChatHistory[startingPage]['content'])

  let promptText = useRef(GPTChatHistory[startingPage]['content'])

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

  return (
    <>
      <div className="page-container">
        <StoryBookBrowseInfoPanel authorID={authorID} currentUser={currentUser} bookID={bookID} author={author} title={title} character={character} genre={genre} artstyle={artstyle} AIEngine={AIEngine} genreFont={genreFont} ratings={ratings}/>
        <StoryBookBrowse id={bookID} chapterTexts={chapterTexts} chapterImgURLs={chapterImgURLs} renderChapter={renderChapter} setRender={setRenderChapter} setChapterPromptText={setChapterPromptText} GPTChatHistory={GPTChatHistory} promptText={promptText}/>
        <SysInfoPanel genre={genre} genreFont={genreFont} artstyle={artstyle} renderChapter={renderChapter} GPTChatHistory={GPTChatHistory} chapterPrompt={chapterPromptText} promptText={promptText}/>
      </div>
    </>
  )};
  

export default StoryBookBrowseContainer;