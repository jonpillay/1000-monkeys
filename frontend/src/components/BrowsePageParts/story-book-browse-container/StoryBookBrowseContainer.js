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

  const bookID = props.bookID

  const authorID = props.authorID

  const currentUser = props.currentUser

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

  const GPTChatHistory = props.GPTChatHistory

  const SDPromptHistory = props.SDPromptHistory

  const localBooksRead = props.localBooksRead

  const addBookRead = props.addBookRead

  const ratingsAverage = props.ratingsAverage

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

  const [renderChapter, setRenderChapter] = useState(startingPage)
  const [ userRead, setUserRead ] = useState(currentUser ? currentUser.booksRead.includes(bookID) || localBooksRead.includes(bookID) : false)

  useEffect(() => {
    if (currentUser && renderChapter == 4) {
      if (!currentUser.booksRead.includes(bookID) && !localBooksRead.includes(bookID))
      addBookRead(bookID)
      setUserRead(true)
    }

  }, [renderChapter])

  return (
    <>
      <div className="page-container">
        <StoryBookBrowseInfoPanel authorID={authorID} currentUser={currentUser} bookID={bookID} author={author} title={title} character={character} genre={genre} artstyle={artstyle} AIEngine={AIEngine} genreFont={genreFont} ratings={ratings} userRead={userRead} ratingsAverage={ratingsAverage}/>
        <StoryBookBrowse id={bookID} chapterTexts={chapterTexts} chapterImgURLs={chapterImgURLs} renderChapter={renderChapter} setRender={setRenderChapter} genre={genre} genreFont={genreFont} artstyle={artstyle} character={character} GPTChatHistory={GPTChatHistory} SDPromptHistory={SDPromptHistory}/>
      </div>
    </>
  )};
  

export default StoryBookBrowseContainer;