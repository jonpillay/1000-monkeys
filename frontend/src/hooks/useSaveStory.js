import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CreditsContext } from "../context/CreditsContext";
import { useAuthContext } from "./useAuthContext";


export const useSaveStory = () => {
  const { user } = useAuthContext()

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  // const { dispatch } = useContext(AuthContext)
  // const { creditDispatch } = useContext(CreditsContext)
  // const { dispatch } = useStoryContext()

  // console.log(dispatch)

  const saveStory = async (storyPages, genre, character, artstyle) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('./save/create-story', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({storyPages, genre, character, artstyle})
    })

    const JSONres = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(JSONres.error)
    }

    if (response.ok) {
      const storyPages = JSON.parse(localStorage.getItem('storyPages'))
      storyPages['storyID'] = JSONres.story_id
      localStorage.setItem('storyPages', JSON.stringify(storyPages))
      setIsLoading(false)
    }
  }

  const updateStory = async (story_id, storyPages, genre) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('./save/update-story', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({story_id, storyPages, genre})
    })

    const JSONres = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(JSONres.error)
    }

    if (response.ok) {
      setIsLoading(false)
    }
  }

  return { saveStory, updateStory, isLoading, error }
}