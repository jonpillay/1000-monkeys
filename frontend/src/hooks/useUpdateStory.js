import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const baseUrl = process.env.NODE_ENV === 'production' ? window.env.API_URL : '';

export const useSaveStory = () => {
  const { user } = useAuthContext()

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const updateStory = async (story_id, storyPages, genre) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${baseUrl}/save/update-story`, {
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

  return { updateStory, isLoading, error }
}