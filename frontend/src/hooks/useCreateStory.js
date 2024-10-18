import { useState, useContext } from "react";
import { useAuthContext } from "./useAuthContext";
import { useStoryContext } from "./useStoryContext";

import { AuthContext } from "../context/AuthContext";
import { CreditsContext } from "../context/CreditsContext";

import { useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";

import { addChapter, nextPage, previousPage, turnToPage, turnToLastPage, selectRenderChapter, selectAllChapterImages, prepStoryBookRefreshChapter, selectAllChapterTexts, removeChapterImage, swapChapterImage } from "../components/story-book/storyBookSlice";
import { selectCharacter, selectGenre, selectArtStyle, selectGPTPromptHistory, selectStoryInSync, pushGPTPrompt, setStoryInProgress, setStoryInSync, initialiseStory, refreshChapterPrep, setFirstChapter } from "../components/create-stories-page/storyBookSysInfoSlice";

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

  const chapterTexts = useSelector(selectAllChapterTexts)
  const chapterImages = useSelector(selectAllChapterImages)

  const renderChapter = useSelector(selectRenderChapter)

  const userCharacter = useSelector(selectCharacter)
  const userGenre = useSelector(selectGenre)
  const userStyle = useSelector(selectArtStyle)
  const GPTPromptHistory = useSelector(selectGPTPromptHistory)

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

    const localGPTPromptHistory = JSON.parse(localStorage.getItem('localGPTPromptHistory')) || []

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
        GPTPromptHistory: localGPTPromptHistory,
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

        localGPTPromptHistory.push(GPTResult)

        localStorage.setItem('localGPTPromptHistory', JSON.stringify(localGPTPromptHistory))
        reduxDispatch(pushGPTPrompt(GPTResult))
        reduxDispatch(setStoryInProgress(true))
        reduxDispatch(setStoryInSync(false))
        setStoryInSync(false)
        reduxDispatch(turnToLastPage())
        loadingDispatch({type: 'LOADED'})
  
        });
    } catch (error) {
      console.log("useCreateStory threw the error")
      console.error(error)
    } 
  };


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

      await pushPromptToRedux(pushGPTPrompt(prompt))
  
      localStorage.setItem("localGPTPromptHistory", JSON.stringify(GPTPromptHistory))

      await AIGenCall()

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
      
      reduxDispatch(prepStoryBookRefreshChapter())
      reduxDispatch(refreshChapterPrep())

      let GPTPromptHistory = JSON.parse(localStorage.getItem("localGPTPromptHistory"))

      GPTPromptHistory.pop()

      AIGenCall()
    } else {
      navigate('/')
    }
  };

  const refreshImage = () => {

    if (user) {

      // 

      console.log("We did here though")

      loadingDispatch({type: 'LOADING'})

      const userChoicesJSON = { 
        character: userCharacter,
        genre: userGenre,
        style: userStyle,
      }

      // reduxDispatch(removeChapterImage(renderChapter))
  
      const chapterText = chapterTexts[renderChapter]
  
      console.log(typeof chapterText)
  
      const reqBody = {
        userChoices: userChoicesJSON,
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
        console.log("MADE IT JENNY!")
        reduxDispatch(swapChapterImage(renderChapter, data["page_image"]))
        reduxDispatch(turnToPage(renderChapter))
        loadingDispatch({type: 'LOADED'})
      })
    } else {
      navigate('/')
    }
  }

  return { AIGenCall, userPromtNextChapter, AIPromptNextChapter, refreshStory, refreshImage, storyInSync, setStoryInSync, isLoading, setIsLoading, error }
}