import './StoryBookBrowseContainer.css'

import { useState, useEffect } from "react";

import ChapterTitle from "../chapter-title/ChapterTitle";
import StoryBookBrowse from '../story-book-browse/StoryBookBrowse';
import LoadIntoCreateButton from '../load-into-create-button/LoadIntoCreateButton';
import StoryBookBrowseInfoPanel from '../storybook-browse-info-panel/StoryBookBrowseInfoPanel';


const StoryBookBrowseContainer = (props) => {

  /*

  Needs a useEffect to load in the current page number in relation to the object key

  */

  // useEffect(() => {
    
  // })

  // console.log("StoryBookBrowseContainer rerendered")

  const bookID = props.bookID

  const authorID = props.authorID

  const currentUser = props.currentUser

  const title = props.title
  
  const chapterTexts = props.chapterTexts

  const chapterImgURLs = props.chapterImgURLs

  const startingPage = props.pageNumber

  const character = props.character

  const artstyle = props.artstyle

  const genre = props.genre

  const AIEngine = props.AIEngine

  const [renderChapter, setRenderChapter] = useState(startingPage)

  

  return (
    <>
    <div className="page-container">
      <StoryBookBrowseInfoPanel authorID={authorID} currentUser={currentUser} bookID={bookID} title={title} character={character} genre={genre} artstyle={artstyle} AIEngine={AIEngine}/>
      <div className="storybook-header">
        {/* <ChapterTitle AIEngine={AIEngine}/> */}
      </div>
        <StoryBookBrowse id={bookID} chapterTexts={chapterTexts} chapterImgURLs={chapterImgURLs} renderChapter={renderChapter} setRender={setRenderChapter}/>
    </div>
    </>
  )};
  

export default StoryBookBrowseContainer;