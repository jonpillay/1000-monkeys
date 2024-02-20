import { useState, useContext } from "react";
import { useAuthContext } from "./useAuthContext";
import { useStoryContext } from "./useStoryContext";
import { AuthContext } from "../context/AuthContext";
import { CreditsContext } from "../context/CreditsContext";
import { useNavigate } from "react-router";

import { UseDispatch, useDispatch } from "react-redux";
import { setUserToken } from "../components/create-stories-page/storyBookSysInfoSlice";

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useContext(AuthContext)
  const { creditDispatch } = useContext(CreditsContext)
  const reduxDispatch = useDispatch()
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
      reduxDispatch(setUserToken(JSONres.token))
      creditDispatch({type: 'UPDATE', payload: JSONres.credits})
      localStorage.setItem('credits', JSONres.credits)
      localStorage.setItem('user', JSON.stringify(JSONres))
      localStorage.removeItem('isLoading')

      dispatch({type: 'LOGIN', payload: JSONres})

      setIsLoading(false)

      navigate('/start-your-story')
    }
  }

  return { login, isLoading, error }
}