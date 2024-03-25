import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { useDispatch } from "react-redux";

export const useSubmitRating = () => {
  const { user } = useAuthContext()

  const reduxDispatch = useDispatch()

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const submitRating = async (story_id, rating, setUserRated) => {
    setIsLoading(true)
    setError(null)

    console.log(user.token)

    try {
      const response = await fetch('./save/submit-rating', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(story_id, rating)
      })
  
      const JSONres = await response.json()
  
      if (!response.ok) {
        console.log("rating failed")
        setIsLoading(false)
        setError(JSONres.error)
      }
  
      if (response.ok) {
        console.log("response on the submitRating is ok")

        setUserRated(true)
        
        setIsLoading(false)
      }
    } catch (error) {
      console.log("actually ended here")
      setIsLoading(false)
      setError(error.message)
    }
  }

  return { submitRating, isLoading, error }
}