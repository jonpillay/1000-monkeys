import { useState, useContext } from "react";
import { useAuthContext } from "./useAuthContext";
import { useStoryContext } from "./useStoryContext";
import { AuthContext } from "../context/AuthContext";


export const useActivate = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useContext(AuthContext)
  const user = useAuthContext()

  const activate = async (email, invite_code) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('./user/activate', {
      method: 'Post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, invite_code})
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

  return { activate, isLoading, error }
}