import './StoryBookBrowseContainer.css'

import React, { useState } from "react";

import "./ResultPage.css";

import ChapterTitle from "../chapter-title/ChapterTitle";
import StoryBookBrowse from '../story-book-browse/StoryBookBrowse';


const StoryBookBrowseContainer = (props) => {

  /*

  Needs a useEffect to load in the current page number in relation to the object key

  */

  console.log("StoryBookBrowseContainer rerendered")

  const chapterTexts = props.chapterTexts

  const chapterImgURLs = props.chapterImgURLs

  const startingPage = props.staringPage

  let [renderChapter, setRenderChapter] = useState(startingPage)

  return (
    <>
    <div className="page-container">
      <div className="storybook-header">
        <ChapterTitle chapterNumber={renderChapter + 1}/>
      </div>
        <StoryBookBrowse storyPages={storyPages} setRender={[renderChapter, setRenderChapter]}/>
    </div>
    </>
  )};
  

export default StoryBookBrowseContainer;