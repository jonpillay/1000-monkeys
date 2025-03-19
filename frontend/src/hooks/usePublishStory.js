import { useAuthContext } from "./useAuthContext"
import { useState } from "react"

import { useDispatch } from "react-redux"
import { setMongoID } from "../components/Pages/create-stories-page/storyBookSysInfoSlice"

const baseUrl = process.env.NODE_ENV === 'production' ? window.env.API_URL : '';

export const usePublishStory = () => {
  
  const { user } = useAuthContext()

  const reduxDispatch = useDispatch()

  const [publishError, setPublishError] = useState(null)
  const [publishing, setPublishing] = useState(null)
  const [justPublished, setJustPublished] = useState(false)

  const publishStory = async (story_id, title) => {

    setPublishError(null)

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
        setPublishing(false)
        setPublishError(JSONres.error)
      }
  
      if (response.ok) {
        setJustPublished(true)
        setPublishing(false)
      }
    } catch (error) {
      setPublishing(false)
      setPublishError(error.message)
    }
  }

  return { publishStory, publishing, publishError, justPublished }
}