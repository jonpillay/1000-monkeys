import React, { useEffect, useState, useRef, useContext } from "react";
import Image from "../image/image";
import Story from "../story/Story";
import TurnPageButton from "../turn-page-button/turnPageButton";
import "./ResultPage.css";
import LoadingIcon from "../loading-icon/LoadingIcon";
import LoadingPage from "../loading_page/LoadingPage";
import SteerStory from "../steer-story/SteerStory";
import ChapterTitle from "../chapter-title/ChapterTitle";
import StoryControlPanel from "../story-control-panel/StoryControlPanel";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router";
import { CreditsContext } from "../../context/CreditsContext";


import { useLoadingContext } from "../../hooks/useLoadingContext";
import { LoadingContext } from "../../context/LoadingContext";

import { useStoryContext } from '../../hooks/useStoryContext';

import {useCreateStory} from "../../hooks/useCreateStory"
import StoryBook from "../story-book/StoryBook";
import SaveStoryButton from "../save-story-button/SaveStoryButton";


const ResultPage = () => {

  const { AIGenCall, userPromtNextChapter, AIPromptNextChapter, refreshStory, refreshImage, storyInSync, setStoryInSync, isLoading, setIsLoading, storyPages, error } = useCreateStory()

  const { loading } = useLoadingContext()

  console.log("This is the loading value on the results page", loading)

  const { user } = useAuthContext()

  const {story} = useStoryContext()

  const navigate = useNavigate()

  const { creditDispatch } = useContext(CreditsContext)

  const { loadingDispatch } = useContext(LoadingContext)

  console.log("ResultPage rerendered")

  let localStoryPages = JSON.parse(localStorage.getItem("storyPages"))

  let sysInfo = JSON.parse(localStorage.getItem("sysInfo"))

  const inSync = localStorage.getItem('storyInSync')

  useEffect(() => {
    const initialiseStory = async () => {
      console.log("userEffect triggered")
      if (localStorage.getItem('user')) {
        console.log("user eval triggred")
        let sysInfo = JSON.parse(localStorage.getItem("sysInfo"))
        if (sysInfo["firstLoad"] === true) {
          console.log("first load triggered")
          sysInfo["firstLoad"] = false
          localStorage.setItem("sysInfo", JSON.stringify(sysInfo))
          console.log("First load useEffect")
          AIGenCall();
    }
    } else {
      navigate('/')
    }
  }
  initialiseStory()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);



  const [renderChapter, setRenderChapter] = useState(sysInfo["currentPage"])

  // let renderChapter = sysInfo["currentPage"]

  return (
    <>
      {!loading ? (
        <>
        <div className="create-page-container">
          <div className="storybook-header">
            <ChapterTitle chapterNumber={renderChapter + 1}/>
            <SaveStoryButton setStoryInSync={[storyInSync, setStoryInSync]}/>
          </div>
            <StoryBook storyPages={storyPages} setRender={[renderChapter, setRenderChapter]}/>
          <div className="nav-container">
            <SteerStory callback={userPromtNextChapter} />
            <StoryControlPanel refreshStory={refreshStory} refreshImage={refreshImage} whatHappensNext={AIPromptNextChapter}/>
          </div>
        </div>
        </>
        ) : (
        <div className="nav-box">
          <LoadingPage />
        </div>  
      )}
    </>
  )};
  

export default ResultPage;
