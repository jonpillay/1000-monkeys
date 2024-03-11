import './StoryBookBrowseContainer.css'

import { useState, useEffect } from "react";

import ChapterTitle from "../chapter-title/ChapterTitle";
import StoryBookBrowse from '../story-book-browse/StoryBookBrowse';
import LoadIntoCreateButton from '../load-into-create-button/LoadIntoCreateButton';


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
  
  const chapterTexts = props.chapterTexts

  const chapterImgURLs = props.chapterImgURLs

  const startingPage = props.pageNumber

  const character = props.character

  const AIEngine = props.AIEngine

  const [renderChapter, setRenderChapter] = useState(startingPage)

  console.log("this is the render chapter ", renderChapter)

  console.log(authorID)
  console.log(currentUser)

  return (
    <>
    <div>{character}</div>
    {authorID == currentUser ? (
    <LoadIntoCreateButton storyID={bookID} />
    ) : (
      <div className="buff"></div>
    )}
    <div className="page-container">
      <div className="storybook-header">
        <ChapterTitle AIEngine={AIEngine}/>
      </div>
        <StoryBookBrowse id={bookID} chapterTexts={chapterTexts} chapterImgURLs={chapterImgURLs} renderChapter={renderChapter} setRender={setRenderChapter}/>
    </div>
    </>
  )};
  

export default StoryBookBrowseContainer;