import { useState, useContext } from "react";
import { useAuthContext } from "./useAuthContext";
import { useStoryContext } from "./useStoryContext";

import { AuthContext } from "../context/AuthContext";
import { CreditsContext } from "../context/CreditsContext";
import { StoryContext } from "../context/StoryContext";

import { useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";

import { addChapter, nextPage, previousPage, turnToPage, turnToLastPage, selectRenderChapter, selectAllChapterImages, prepStoryBookRefreshChapter, selectAllChapterTexts, removeChapterImage, swapChapterImage } from "../components/CreateStoryPageParts/story-book-create/storyBookSlice";
import { selectCharacter, selectGenre, selectArtStyle, selectGPTPromptHistory, selectStoryInSync, pushGPTPrompt, pushSDPrompt, setStoryInProgress, setStoryInSync, initialiseStory, refreshChapterPrep, setFirstChapter, resetStorySysInfo } from "../components/Pages/create-stories-page/storyBookSysInfoSlice";

import { LoadingContext } from "../context/LoadingContext";
import { clearReduxPersist } from "../redux-state/store";

export const useCreateStory = () => {
  const reduxDispatch = useDispatch() 
  const { loadingDispatch } = useContext(LoadingContext)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState()
  const { dispatch } = useContext(AuthContext)
  const { creditDispatch } = useContext(CreditsContext)
  const { dispatch: storyDispatch } = useContext(StoryContext)

  const { user } = useAuthContext()

  const navigate = useNavigate()

  const chapterTexts = useSelector(selectAllChapterTexts)
  const chapterImages = useSelector(selectAllChapterImages)

  const renderChapter = useSelector(selectRenderChapter)

  const userCharacter = useSelector(selectCharacter)
  const userGenre = useSelector(selectGenre)
  const userStyle = useSelector(selectArtStyle)
  const GPTPromptHistory = useSelector(selectGPTPromptHistory)

  const storyInSync = useSelector(selectStoryInSync)

  const notFirstChapter = async () => {
    reduxDispatch(setFirstChapter(false))
  }

  const AIGenCall = async () => {

    const localGPTPromptHistory = JSON.parse(localStorage.getItem('localGPTPromptHistory')) || []

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
  
      const response = await fetch("/story", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(reqBody),
      })

      if (!response.ok) {
        console.log("Caught here")
        console.log(error)
        if (chapterTexts.length > 0) {
          loadingDispatch({type: 'LOADED'})
          setError("Creation Engine Crash, Please Try Again")
          return
        } else {
          localStorage.removeItem('storyPages')
          localStorage.removeItem('sysInfo');
          localStorage.removeItem('userChoices');
          localStorage.removeItem('GPTPromptHistory');
          localStorage.removeItem('localGPTPromptHistory');
          reduxDispatch(resetStorySysInfo())
          clearReduxPersist()
          localStorage.setItem('firstChapter', 'true')
          navigate('/start-your-story', {
            state: {error: "Creation Engine Crash, Please Try Again"},
          })
          return
        }
      }

      const data = await response.json()

      creditDispatch({type: 'UPDATE', payload: data.credits_update})
      reduxDispatch(addChapter(data["page_image"], data["page_text"]))


      const GPTResult = {
        role: "assistant",
        content: data["page_text"]
      }

      await localGPTPromptHistory.push(GPTResult)
      localStorage.setItem('localGPTPromptHistory', JSON.stringify(localGPTPromptHistory))

      await storyDispatch({type: 'BEGIN', payload: null})
      reduxDispatch(pushGPTPrompt(GPTResult))
      reduxDispatch(pushSDPrompt(data['SDPrompt']))
      reduxDispatch(setStoryInProgress(true))
      reduxDispatch(setStoryInSync(false))
      setStoryInSync(false)
      reduxDispatch(turnToLastPage())
      loadingDispatch({type: 'LOADED'})
      navigate('/create')

    } catch (error) {
      console.log("Caught here")
      console.log(error)
      if (chapterTexts.length > 0) {
        setError(error)
      } else {
        setError(error)
        navigate('/start-your-story')
      }
    } 
  };


  const pushPromptToRedux = async (prompt) => {
    reduxDispatch(pushGPTPrompt(prompt))
  }

  const userPromtNextChapter = async (prompt) => {
    try {
      if (user) {

        const GPTPromptHistory = JSON.parse(localStorage.getItem('localGPTPromptHistory'))
  
        const userPrompt = {
          role: "user",
          content: prompt
        }
  
        GPTPromptHistory.push(userPrompt)
  
        await pushPromptToRedux(userPrompt)
    
        localStorage.setItem("localGPTPromptHistory", JSON.stringify(GPTPromptHistory))
  
        await AIGenCall()
  
      } else {
        navigate('/')
      }
    } catch (error) {
      setError(error)
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

      localStorage.setItem("localGPTPromptHistory", JSON.stringify(GPTPromptHistory))

      AIGenCall()
    } else {
      navigate('/')
    }
  };

  const refreshImage = () => {

    if (user) {

      loadingDispatch({type: 'LOADING'})

      const userChoicesJSON = { 
        character: userCharacter,
        genre: userGenre,
        style: userStyle,
      }

      // reduxDispatch(removeChapterImage(renderChapter))
  
      const chapterText = chapterTexts[renderChapter]
    
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
        reduxDispatch(swapChapterImage(renderChapter, data["page_image"]))
        reduxDispatch(turnToPage(renderChapter))
        reduxDispatch(setStoryInSync(false))
        setStoryInSync(false)
        loadingDispatch({type: 'LOADED'})
      })
    } else {
      navigate('/')
    }
  }

  return { AIGenCall, userPromtNextChapter, AIPromptNextChapter, refreshStory, refreshImage, storyInSync, setStoryInSync, isLoading, setIsLoading, error }
}