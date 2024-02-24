import { useState, useContext } from "react";
import { useAuthContext } from "./useAuthContext";
import { useStoryContext } from "./useStoryContext";

import { AuthContext } from "../context/AuthContext";
import { CreditsContext } from "../context/CreditsContext";

import { useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";

import { addChapter, nextPage, previousPage, turnToPage, turnToLastPage, selectRenderChapter, selectAllChapterImages } from "../components/story-book/storyBookSlice";
import { selectCharacter, selectGenre, selectArtStyle, selectGPTPromptHistory, selectStoryInSync, pushGPTPrompt, setStoryInProgress, setStoryInSync, initialiseStory, setFirstChapter } from "../components/create-stories-page/storyBookSysInfoSlice";

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
  // const GPTPromptHistory = useSelector(selectGPTPromptHistory)

  console.log("This is the userGenre in the useCreateStory hook " + userGenre)

  console.log("This is what the AIGenFunction gets as a character from redux " + userCharacter)


  // const [renderChapter, setRenderChapter] = useState(null)

  // const inSync = localStorage.getItem('storyInSync')
  // let [storyInSync, setStoryInSync] = useState(inSync ? true : false );

  const storyInSync = useSelector(selectStoryInSync)

  const notFirstChapter = async () => {
    reduxDispatch(setFirstChapter(false))
  }

  const AIGenCall = async () => {

    const GPTPromptHistory = JSON.parse(localStorage.getItem('localGPTPromptHistory'))

    console.log(typeof GPTPromptHistory)

    // console.log("This is the prompt history create chapter gets on AIGenCall " + GPTPromptHistory.filter(obj => obj.role === 'user').pop().content)

    await notFirstChapter()

    loadingDispatch({type: 'LOADING'})

    try {
      const userChoicesJSON = { 
        character: userCharacter,
        genre: userGenre,
        style: userStyle,
      }
  
      const reqBody = {
        userchoices: userChoicesJSON,
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
        creditDispatch({type: 'UPDATE', payload: data.credits_update})
        reduxDispatch(addChapter(data["page_image"], data["page_text"]))
  
        const GPTResult = {
          role: "assistant",
          content: data["page_text"]
        }

        GPTPromptHistory.push(GPTResult)

        localStorage.setItem('localGPTPromptHistory', JSON.stringify(GPTPromptHistory))
  
        reduxDispatch(pushGPTPrompt(GPTResult))
        reduxDispatch(setStoryInProgress(true))
        reduxDispatch(setStoryInSync(false))
        setStoryInSync(false)
        reduxDispatch(turnToLastPage())
        loadingDispatch({type: 'LOADED'})
  
        });
    } catch (error) {
      console.error(error)
    } 
  };

  // const initialiseStoryHook = (characterChoice, genreChoice, styleChoice, prompt) => {

  //   const GPTPrompt = {
  //     role: "user",
  //     content: prompt,
  //   }

  //   reduxDispatch(initialiseStory(characterChoice, genreChoice, styleChoice, GPTPrompt))
  // };

  const pushPromptToRedux = async (prompt) => {
    reduxDispatch(pushGPTPrompt(prompt))
  }

  const userPromtNextChapter = async (prompt) => {
    if (user) {

      const GPTPromptHistory = JSON.parse(localStorage.getItem('localGPTPromptHistory'))

      const userPrompt = {
        role: "user",
        content: prompt
      }

      GPTPromptHistory.push(userPrompt)

      await pushPromptToRedux(userPrompt)
  
      // reduxDispatch(pushGPTPrompt(userPrompt))
  
      localStorage.setItem("localGPTPromptHistory", JSON.stringify(GPTPromptHistory))
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