import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CreditsContext } from "../context/CreditsContext";
import { useAuthContext } from "./useAuthContext";

import { useDispatch } from "react-redux";
import { setMongoID } from "../components/Pages/create-stories-page/storyBookSysInfoSlice";

export const useSaveStory = () => {
  const { user } = useAuthContext()

  const reduxDispatch = useDispatch()

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const saveStory = async (chapterImages, chapterTexts, genre, character, artstyle, GPTChatHistory, AIEngineVer, author) => {
    setIsLoading(true)
    setError(null)

    const reqBody = {
      chapterImages: chapterImages,
      chapterTexts: chapterTexts,
      genre: genre,
      character: character,
      artstyle: artstyle,
      GPTChatHistory: GPTChatHistory,
      AIEngineVer: AIEngineVer,
      author: author,
    }

    try {
      const response = await fetch('./save/create-story', {
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

  const updateStory = async (story_id, chapterImages, chapterTexts, GPTChatHistory) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('./save/update-story', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({story_id, chapterImages, chapterTexts, GPTChatHistory})
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