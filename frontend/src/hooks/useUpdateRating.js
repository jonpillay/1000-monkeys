import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { useDispatch } from "react-redux";

const baseUrl = process.env.NODE_ENV === 'production' ? window.env.API_URL : '';

export const useUpdateRating = () => {
  const { user } = useAuthContext()

  const reduxDispatch = useDispatch()

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const submitRating = async (story_id, rating) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${baseUrl}/save/submit-rating`, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({story_id, rating})
      })
  
      const JSONres = await response.json()
  
      if (!response.ok) {
        console.log(JSONres.error)
        setIsLoading(false)
        setError(JSONres.error)
      }
  
      if (response.ok) {
        setIsLoading(false)
        return JSONres.updatedRatingsAverage
      }
    } catch (error) {
      console.log(error.message)
      setIsLoading(false)
      setError(error.message)
    }
  }

  return { submitRating, isLoading, error }
}