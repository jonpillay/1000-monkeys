import { useState, useContext } from "react";
import { useAuthContext } from "./useAuthContext";
import { useStoryContext } from "./useStoryContext";

import { AuthContext } from "../context/AuthContext";
import { CreditsContext } from "../context/CreditsContext";
import { StoryContext } from "../context/StoryContext";

import { useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";

import { addChapter, nextPage, previousPage, turnToPage, turnToLastPage, selectRenderChapter, selectAllChapterImages, prepStoryBookRefreshChapter, selectAllChapterTexts, removeChapterImage, swapChapterImage } from "../components/CreateStoryPageParts/story-book-create/storyBookSlice";
import { selectCharacter, selectGenre, selectArtStyle, selectGPTPromptHistory, selectStoryInSync, pushGPTPrompt, pushSDPrompt, setStoryInProgress, setStoryInSync, initialiseStory, refreshChapterPrep, swapChapterSDPrompt, setFirstChapter, resetStorySysInfo } from "../components/Pages/create-stories-page/storyBookSysInfoSlice";

import { LoadingContext } from "../context/LoadingContext";
import { clearReduxPersist } from "../redux-state/store";

const baseUrl = process.env.NODE_ENV === 'production' ? window.env.API_URL : '';

export const useCreateStory = () => {
  const reduxDispatch = useDispatch() 
  const { loadingDispatch } = useContext(LoadingContext)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState()
  const { dispatch: authDispatch } = useContext(AuthContext)
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

    loadingDispatch({type: 'LOADING'})

    const localGPTPromptHistory = JSON.parse(localStorage.getItem('localGPTPromptHistory')) || []

    await notFirstChapter()

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
  
      const response = await fetch(`${baseUrl}/story/create-chapter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(reqBody),
      })

      if (!response.ok) {

          const errorResponse = await response.json()

          if (errorResponse && errorResponse.error && errorResponse.message) {

            const { error, message } = errorResponse

            switch (error) {

              case 'CORRUPTPROMPTHISTORY':
                localStorage.removeItem('storyPages')
                localStorage.removeItem('sysInfo');
                localStorage.removeItem('userChoices');
                localStorage.removeItem('GPTPromptHistory');
                localStorage.removeItem('localGPTPromptHistory');
                reduxDispatch(resetStorySysInfo())
                clearReduxPersist()
                storyDispatch({type: 'END'})
                localStorage.setItem('firstChapter', 'true')
                navigate('/start-your-story', {
                  state: {error: message},
                })
                loadingDispatch({type: 'LOADED'})
                return

              case 'LENGTHCHECKERROR':
                localStorage.removeItem('user')
                localStorage.removeItem('storyPages')
                localStorage.removeItem('sysInfo');
                localStorage.removeItem('userChoices');
                localStorage.removeItem('GPTPromptHistory');
                localStorage.removeItem('localGPTPromptHistory');
                localStorage.removeItem('browsePageNumbers');
                storyDispatch({type: 'END'})
                authDispatch({type: 'LOGOUT'})
                reduxDispatch(resetStorySysInfo())
                clearReduxPersist()
                localStorage.setItem('firstChapter', 'true')
                navigate('/', {
                  state: {error: message, warnedState: "APILENGTHATTEMPT"},
                })
                loadingDispatch({type: 'LOADED'})
                return

              case 'BADWORDPROMPTERROR':
                localStorage.removeItem('user')
                localStorage.removeItem('storyPages')
                localStorage.removeItem('sysInfo');
                localStorage.removeItem('userChoices');
                localStorage.removeItem('GPTPromptHistory');
                localStorage.removeItem('localGPTPromptHistory');
                localStorage.removeItem('browsePageNumbers');
                authDispatch({type: 'LOGOUT'})
                storyDispatch({type: 'END'})
                reduxDispatch(resetStorySysInfo())
                clearReduxPersist()
                localStorage.setItem('firstChapter', 'true')
                navigate('/', {
                  state: {error: message, warnedState: "APIBADWORDATTEMPT"},
                })
                loadingDispatch({type: 'LOADED'})
                return
            }

          } else {
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
              storyDispatch({type: 'END'})
              localStorage.setItem('firstChapter', 'true')
              navigate('/start-your-story', {
                state: {error: "Creation Engine Crash, Please Try Again"},
              })
              loadingDispatch({type: 'LOADED'})
              return
            }
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
      return

    } catch (error) {
      localStorage.removeItem('storyPages')
      localStorage.removeItem('sysInfo');
      localStorage.removeItem('userChoices');
      localStorage.removeItem('GPTPromptHistory');
      localStorage.removeItem('localGPTPromptHistory');
      reduxDispatch(resetStorySysInfo())
      clearReduxPersist()
      storyDispatch({type: 'END'})
      localStorage.setItem('firstChapter', 'true')
      navigate('/start-your-story', {
        state: {error: "Engine Crash. Please Reload Story."},
      })
      loadingDispatch({type: 'LOADED'})
      return
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
  
      fetch(`${baseUrl}/images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(reqBody),
      })
      .then((response) => response.json())
      .then((data) => {
        reduxDispatch(swapChapterImage(renderChapter, data["page_image"]))
        reduxDispatch(swapChapterSDPrompt(renderChapter, data["SD_prompt"]))
        reduxDispatch(turnToPage(renderChapter))
        reduxDispatch(setStoryInSync(false))
        creditDispatch({type: 'UPDATE', payload: data.credits_update})
        setStoryInSync(false)
        loadingDispatch({type: 'LOADED'})
      })
    } else {
      navigate('/')
    }
  }

  return { AIGenCall, userPromtNextChapter, AIPromptNextChapter, refreshStory, refreshImage, storyInSync, setStoryInSync, isLoading, setIsLoading, error }
}