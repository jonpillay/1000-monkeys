import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CreditsContext } from "../context/CreditsContext";
import { useAuthContext } from "./useAuthContext";

import { useDispatch } from "react-redux";
import { setMongoID } from "../components/Pages/create-stories-page/storyBookSysInfoSlice";

import { useSelector } from "react-redux";
import { selectAiEngineVer } from "../components/app/systemInfoSlice";

const baseUrl = process.env.NODE_ENV === 'production' ? window.env.API_URL : '';

export const useSaveStory = () => {

  const { user } = useAuthContext()

  const reduxDispatch = useDispatch()

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const saveStory = async (chapterImages, chapterTexts, genre, character, artstyle, GPTChatHistory, SDPromptHistory, AIEngineVer, author) => {
    setIsLoading(true)
    setError(null)

    const reqBody = {
      chapterImages: chapterImages,
      chapterTexts: chapterTexts,
      genre: genre,
      character: character,
      artstyle: artstyle,
      GPTChatHistory: GPTChatHistory,
      SDPromptHistory: SDPromptHistory,
      AIEngineVer: AIEngineVer,
      author: author
    }

    try {
      const response = await fetch(`${baseUrl}/save/create-story`, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(reqBody)
      })
  
      const JSONres = await response.json()
  
      if (!response.ok) {
        console.log(JSONres.error)
        setIsLoading(false)
        setError(JSONres.error)
      }
  
      if (response.ok) {

        reduxDispatch(setMongoID(JSONres.story_id))
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error.message)
      setIsLoading(false)
      setError(error.message)
    }
  }

  const updateStory = async (story_id, chapterImages, chapterTexts, GPTChatHistory, SDPromptHistory) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${baseUrl}/save/update-story`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({story_id, chapterImages, chapterTexts, GPTChatHistory, SDPromptHistory})
    })

    const JSONres = await response.json()

    if (!response.ok) {
      console.log(JSONres.error)
      setIsLoading(false)
      setError(JSONres.error)
    }

    if (response.ok) {
      setIsLoading(false)
    }
  }

  return { saveStory, updateStory, isLoading, error }
}