import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CreditsContext } from "../context/CreditsContext";
import { useAuthContext } from "./useAuthContext";

import { useDispatch } from "react-redux";
import { setMongoID } from "../components/create-stories-page/storyBookSysInfoSlice";

export const useSaveStory = () => {
  const { user } = useAuthContext()

  const reduxDispatch = useDispatch()

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const saveStory = async (chapterImages, chapterTexts, genre, character, artstyle, GPTChatHistory, AIEngineVer) => {
    setIsLoading(true)
    setError(null)

    console.log(user.token)

    const reqBody = {
      chapterImages: chapterImages,
      chapterTexts: chapterTexts,
      genre: genre,
      character: character,
      artstyle: artstyle,
      GPTChatHistory: GPTChatHistory,
      AIEngineVer: AIEngineVer,
    }

    console.log(reqBody)

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
        console.log("ended here")
        setIsLoading(false)
        setError(JSONres.error)
      }
  
      if (response.ok) {
        console.log("response on the saveStory is ok")
        // const storyPages = JSON.parse(localStorage.getItem('storyPages'))
        // storyPages['storyID'] = JSONres.story_id
        console.log(JSONres.story_id)
        reduxDispatch(setMongoID(JSONres.story_id))
        // localStorage.setItem('storyPages', JSON.stringify(storyPages['storyID']))
        setIsLoading(false)
      }
    } catch (error) {
      console.log("actually ended here")
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
      console.log("Update failed")
      setIsLoading(false)
      setError(JSONres.error)
    }

    if (response.ok) {
      console.log("we got to update")
      setIsLoading(false)
    }
  }

  return { saveStory, updateStory, isLoading, error }
}