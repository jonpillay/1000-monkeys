import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('./user/login', {
      method: 'Post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    })

    const JSONres = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(JSONres.error)
    }

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(JSONres))

      dispatch({type: 'LOGIN', payload: JSONres})

      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}