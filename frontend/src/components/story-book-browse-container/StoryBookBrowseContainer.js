import './StoryBookBrowseContainer.css'

import { useState, useEffect } from "react";

import ChapterTitle from "../chapter-title/ChapterTitle";
import StoryBookBrowse from '../story-book-browse/StoryBookBrowse';


const StoryBookBrowseContainer = (props) => {

  /*

  Needs a useEffect to load in the current page number in relation to the object key

  */

  useEffect(() => {
    
  })

  console.log("StoryBookBrowseContainer rerendered")

  const id = props.id
  
  const chapterTexts = props.chapterTexts

  const chapterImgURLs = props.chapterImgURLs

  const startingPage = props.pageNumber

  const [renderChapter, setRenderChapter] = useState(startingPage)

  console.log("this is the render chapter ", renderChapter)

  return (
    <>
    <div className="page-container">
      <div className="storybook-header">
        <ChapterTitle chapterNumber={renderChapter + 1}/>
      </div>
        <StoryBookBrowse id={id} chapterTexts={chapterTexts} chapterImgURLs={chapterImgURLs} renderChapter={renderChapter} setRender={setRenderChapter}/>
    </div>
    </>
  )};
  

export default StoryBookBrowseContainer;