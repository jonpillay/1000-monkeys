import './StoryBookBrowseContainer.css'

import React, { useState } from "react";

import "./ResultPage.css";

import ChapterTitle from "../chapter-title/ChapterTitle";
import StoryBook from "../story-book/StoryBook";


const StoryBookBrowseContainer = (props) => {

  /*

  Needs a useEffect to load in the current page number in relation to the object key

  */

  console.log("StoryBookBrowseContainer rerendered")

  let storyPages = props.storyPages

  let sysInfo = JSON.parse(localStorage.getItem("sysInfo"))

  let [renderChapter, setRenderChapter] = useState(sysInfo["currentPage"])

  return (
    <>
    <div className="page-container">
      <div className="storybook-header">
        <ChapterTitle chapterNumber={renderChapter + 1}/>
      </div>
        <StoryBook storyPages={storyPages} setRender={[renderChapter, setRenderChapter]}/>
    </div>
    </>
  )};
  

export default StoryBookBrowseContainer;