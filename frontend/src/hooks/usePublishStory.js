import { useAuthContext } from "./useAuthContext"
import { useState } from "react"

import { useDispatch } from "react-redux"
import { setMongoID } from "../components/Pages/create-stories-page/storyBookSysInfoSlice"

const baseUrl = process.env.NODE_ENV === 'production' ? window.env.API_URL : '';

export const usePublishStory = () => {
  
  const { user } = useAuthContext()

  const reduxDispatch = useDispatch()

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const publishStory = async (story_id, title) => {

    setError(null)

    const reqBody = {
      story_id: story_id,
      title: title
    }

    try {
      const response = await fetch(`${baseUrl}/save/publish-story`, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(reqBody)
      })
  
      const JSONres = await response.json()
  
      if (!response.ok) {
        setIsLoading(false)
        setError(JSONres.error)
      }
  
      if (response.ok) {

        reduxDispatch(setMongoID(JSONres.story_id))
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
    }
  }

  return { publishStory, isLoading, error }
}