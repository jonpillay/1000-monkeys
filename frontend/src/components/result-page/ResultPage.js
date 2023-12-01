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
import StoryBook from "../story-book/StoryBook";
import SaveStoryButton from "../save-story-button/SaveStoryButton";


const ResultPage = () => {

  const { loading } = useLoadingContext()

  console.log("This is the loading value on the results page", loading)

  const { user } = useAuthContext()

  const navigate = useNavigate()

  const { creditDispatch } = useContext(CreditsContext)

  const { loadingDispatch } = useContext(LoadingContext)

  console.log("ResultPage rerendered")

  let storyPages = JSON.parse(localStorage.getItem("storyPages"))

  let sysInfo = JSON.parse(localStorage.getItem("sysInfo"))

  const inSync = localStorage.getItem('storyInSync')

  let [renderChapter, setRenderChapter] = useState(sysInfo["currentPage"])

  let [storyInSync, setStoryInSync] = useState(inSync ? true : false );

  // let renderChapter = sysInfo["currentPage"]

  useEffect(() => {
    if (localStorage.getItem('user')) {
      if (sysInfo["firstLoad"] === true) {
        sysInfo["firstLoad"] = false
        localStorage.setItem("sysInfo", JSON.stringify(sysInfo))
        console.log("First load useEffect")
        GPTClientCall();
      }
    } else {
      navigate('/')
    }

  }, [user]);

  const GPTClientCall = () => {

    loadingDispatch({type: 'LOADING', payload: true})

    console.log(`This is story pages from the GPTcall funct`)

    const userChoices = localStorage.getItem("userChoices")
    let GPTPromptHistory = localStorage.getItem("GPTPromptHistory")
    let storyPages = JSON.parse(localStorage.getItem("storyPages"))
    let sysInfo = JSON.parse(localStorage.getItem("sysInfo"))


    console.log(storyPages)

    const reqBody = {
      userchoices: userChoices,
      GPTPromptHistory: GPTPromptHistory,
      credits_needed: 3
    }

    fetch("/story", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(reqBody),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      console.log(data.credits_update)
      creditDispatch({type: 'UPDATE', payload: data.credits_update})
      storyPages["textHistory"].push(data["page_text"])
      storyPages["imageHistory"].push(data["page_image"])
      setRenderChapter(storyPages["textHistory"].length-1)
      sysInfo["currentPage"] ++
      loadingDispatch({type: 'LOADED', payload: null})
      console.log(sysInfo)
      console.log(storyPages)
      let GPTPrompts = JSON.parse(GPTPromptHistory)

      GPTPrompts.push({
        role: "assistant",
        content: data["page_text"]
      })

      localStorage.setItem("sysInfo", JSON.stringify(sysInfo))

      localStorage.setItem("GPTPromptHistory", JSON.stringify(GPTPrompts))

      localStorage.setItem("storyPages", JSON.stringify(storyPages))

      console.log(user.credits)

      localStorage.removeItem('storyInSync')

      setStoryInSync(false)

      setRenderChapter(sysInfo["currentPage"])
      
      console.log(GPTPrompts)

      });
  };

  const steerOnUserInput = (steerInput) => {
    if (user) {
      let GPTPrompts = JSON.parse(localStorage.getItem("GPTPromptHistory"))
  
      console.log(steerInput)
  
      GPTPrompts.push({
        role: "user",
        content: steerInput
      })
  
      localStorage.setItem("GPTPromptHistory", JSON.stringify(GPTPrompts))
  
      GPTClientCall()
    } else {
      navigate('/')
    }
  };

  const whatHappensNext = () => {

    if (user) {
      const imaginationPrompt = "Use your imagination to write the next chapter of the story."

      steerOnUserInput(imaginationPrompt)
    } else {
      navigate('/')
    }

  };

  const refreshStory = () => {

    if (user) {
      let GPTPromptHistory = JSON.parse(localStorage.getItem("GPTPromptHistory"))

      let storyPages = JSON.parse(localStorage.getItem("storyPages"))
  
      let sysInfo = JSON.parse(localStorage.getItem("sysInfo"))
  
      console.log(storyPages)
  
      console.log(GPTPromptHistory.length)
  
      GPTPromptHistory.pop()
  
      storyPages["textHistory"].pop()
  
      storyPages["imageHistory"].pop()
  
      sysInfo["currentPage"] = renderChapter -1
  
      localStorage.setItem("sysInfo", JSON.stringify(sysInfo))
      localStorage.setItem("GPTPromptHistory", JSON.stringify(GPTPromptHistory))
      localStorage.setItem("storyPages", JSON.stringify(storyPages))
  
  
      GPTClientCall()
    } else {
      navigate('/')
    }

  };

  const refreshImage = () => {

    if (user) {

      loadingDispatch({type: 'LOADING', payload: true})

      const userChoices = localStorage.getItem("userChoices")
  
      let storyPages = JSON.parse(localStorage.getItem("storyPages"))
  
      storyPages["imageHistory"].splice(renderChapter, 1)
  
      const chapterText = storyPages["textHistory"][renderChapter]
  
      console.log(typeof chapterText)
  
      const reqBody = {
        userChoices: userChoices,
        chapterText: chapterText
      }
  
      fetch("/images", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(reqBody),
      })
      .then((response) => response.json())
      .then((data) => {
        storyPages["imageHistory"].splice(renderChapter, 0, data["page_image"])
        setRenderChapter(renderChapter)
        localStorage.setItem("storyPages", JSON.stringify(storyPages))
        loadingDispatch({type: 'LOADED', payload: null})
      })
    } else {
      navigate('/')
    }
  }

  // const turnPage = (direct) => {
  //   if (direct == 'back') {
  //     story.current = storyPages["textHistory"][renderChapter -1]
  //     imgUrl.current = storyPages["imageHistory"][renderChapter -1]
  //     sysInfo["currentPage"] --
  //     localStorage.setItem("sysInfo", JSON.stringify(sysInfo))
  //     setRenderChapter(renderChapter -1)
  //   } else if (direct == 'next') {
  //     sysInfo["currentPage"] ++
  //     localStorage.setItem("sysInfo", JSON.stringify(sysInfo))
  //     story.current = storyPages["textHistory"][renderChapter +1]
  //     imgUrl.current = storyPages["imageHistory"][renderChapter +1]
  //     setRenderChapter(renderChapter +1)
  //   } else if (direct == 'last') {
  //     story.current = storyPages["textHistory"].slice(-1)
  //     imgUrl.current = storyPages["imageHistory"].slice(-1)
  //     sysInfo["currentPage"] = storyPages["textHistory"].length -1
  //     localStorage.setItem("sysInfo", JSON.stringify(sysInfo))
  //     setRenderChapter = storyPages["textHistory"][storyPages["textHistory"].length -1]
  //   }
  // }

  return (
    <>
      {!loading ? (
        <>
        <div className="page-container">
          <div className="storybook-header">
            <ChapterTitle chapterNumber={renderChapter + 1}/>
            <SaveStoryButton setStoryInSync={[storyInSync, setStoryInSync]}/>
          </div>
            <StoryBook storyPages={storyPages} setRender={[renderChapter, setRenderChapter]}/>
          <div className="nav-container">
            <SteerStory callback={steerOnUserInput} />
            <StoryControlPanel refreshStory={refreshStory} refreshImage={refreshImage} whatHappensNext={whatHappensNext}/>
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
