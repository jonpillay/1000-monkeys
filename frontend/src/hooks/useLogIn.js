import { useState, useContext } from "react";
import { useAuthContext } from "./useAuthContext";
import { useStoryContext } from "./useStoryContext";
import { AuthContext } from "../context/AuthContext";
import { CreditsContext } from "../context/CreditsContext";
import { useNavigate } from "react-router";


export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useContext(AuthContext)
  const { creditDispatch } = useContext(CreditsContext)
  // const { dispatch } = useStoryContext()

  const navigate = useNavigate()

  console.log(dispatch)

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('./user/login', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({email, password})
    })

    const JSONres = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(JSONres.error)
    }

    if (response.ok) {
      creditDispatch({type: 'UPDATE', payload: JSONres.credits})
      localStorage.setItem('credits', JSONres.credits)
      localStorage.setItem('user', JSON.stringify(JSONres))

      dispatch({type: 'LOGIN', payload: JSONres})

      setIsLoading(false)

      navigate('/create')
    }
  }

  return { login, isLoading, error }
}