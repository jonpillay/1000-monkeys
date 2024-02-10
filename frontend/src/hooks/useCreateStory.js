import { useState, useContext } from "react";
import { useAuthContext } from "./useAuthContext";
import { useStoryContext } from "./useStoryContext";

import { AuthContext } from "../context/AuthContext";
import { CreditsContext } from "../context/CreditsContext";

import { useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";

import { addChapter, nextPage, previousPage, turnToPage, turnToLastPage, selectRenderChapter, selectAllChapterImages } from "../components/story-book/storyBookSlice";
import { selectCharacter, selectGenre, selectGPTPromptHistory, selectStoryInSync, pushGPTPrompt, setStoryInSync, selectArtStyle } from "../components/create-stories-page/storyBookSysInfoSlice";

import { LoadingContext } from "../context/LoadingContext";

export const useCreateStory = () => {
  const reduxDispatch = useDispatch()
  const { loadingDispatch } = useContext(LoadingContext)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState()
  const { dispatch } = useContext(AuthContext)
  const { creditDispatch } = useContext(CreditsContext)
  // const { dispatch } = useStoryContext()

  const { user } = useAuthContext()

  const { navigate } = useNavigate()

  const [storyPages, setStoryPages] = useState([])

  const chapterImages = useSelector(selectAllChapterImages)

  const renderChapter = useSelector(selectRenderChapter)

  const userCharacter = useSelector(selectCharacter)
  const userGenre = useSelector(selectGenre)
  const userStyle = useSelector(selectArtStyle)
  const GPTPromptHistory = useSelector(selectGPTPromptHistory)

  // const [renderChapter, setRenderChapter] = useState(null)

  // const inSync = localStorage.getItem('storyInSync')
  // let [storyInSync, setStoryInSync] = useState(inSync ? true : false );

  const storyInSync = useSelector(selectStoryInSync)

  const AIGenCall = async () => {

    loadingDispatch({type: 'LOADING'})

    // setIsLoading(true)
    try {
      const userChoicesJSON = { 
        character: userCharacter,
        genre: userGenre,
        style: userStyle,
      } 
      console.log("This is the userChoices" + userChoicesJSON)
      console.log("This is the userChoices type" + typeof userChoicesJSON)
  
  
      // const userChoicesStringy = JSON.stringify(userChoicesJSON)  
  
      const reqBody = {
        userchoices: userChoicesJSON,
        GPTPromptHistory: GPTPromptHistory,
        credits_needed: 3
      }
  
      console.log(reqBody)
  
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
        // localStoryPages["textHistory"].push(data["page_text"])
        // localStoryPages["imageHistory"].push(data["page_image"])
  
        reduxDispatch(addChapter(data["page_image"], data["page_text"]))
  
        const GPTPrompt = {
          role: "assistant",
          content: data["page_text"]
        }
  
        reduxDispatch(pushGPTPrompt(GPTPrompt))      
  
        setStoryInSync(false)
  
        reduxDispatch(turnToLastPage())
  
        loadingDispatch({type: 'LOADED'})
  
        // setIsLoading(false)
  
        });
    } catch (error) {
      console.error(error)
    } 
  };

  const userPromtNextChapter = (prompt) => {
    if (user) {
      let GPTPrompts = JSON.parse(localStorage.getItem("GPTPromptHistory"))
  
      console.log(prompt)
  
      GPTPrompts.push({
        role: "user",
        content: prompt
      })
  
      localStorage.setItem("GPTPromptHistory", JSON.stringify(GPTPrompts))
      AIGenCall()

    } else {
      navigate('/')
    }
  };

  const AIPromptNextChapter = () => {

    if (user) {
      const imaginationPrompt = "Use your imagination to write the next chapter of the story."

      userPromtNextChapter(imaginationPrompt)
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
  
  
      AIGenCall()
    } else {
      navigate('/')
    }
  };

  const refreshImage = () => {

    if (user) {

      setIsLoading(true)

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
        reduxDispatch(turnToPage(renderChapter))
        localStorage.setItem("storyPages", JSON.stringify(storyPages))
        setIsLoading(false)
      })
    } else {
      navigate('/')
    }
  }

  return { AIGenCall, userPromtNextChapter, AIPromptNextChapter, refreshStory, refreshImage, storyInSync, setStoryInSync, isLoading, setIsLoading, storyPages, setStoryPages, error }
}