import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "./useAuthContext";
import { CreditsContext } from "../context/CreditsContext";
import { useDispatch } from "react-redux";
import { setUserToken } from "../components/Pages/create-stories-page/storyBookSysInfoSlice";

const baseUrl = process.env.NODE_ENV === 'production' ? window.env.API_URL : '';

export const useSignup = () => {

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const { creditDispatch } = useContext(CreditsContext)
  const reduxDispatch = useDispatch()

  const navigate = useNavigate()

  const signup = async (email, password, username) => {
    setIsLoading(true)
    setError(null)

    const token = JSON.parse(localStorage.getItem('activateLocal'))

    const response = await fetch(`${baseUrl}/user/signup`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.token}`
      },
      body: JSON.stringify({email, password, username})
    })

    const JSONres = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(JSONres.error)
    }

    if (response.ok) {
      reduxDispatch(setUserToken(JSONres.token))
      {{creditDispatch({type: 'UPDATE', payload: JSONres.credits})
      localStorage.setItem('credits', JSONres.credits)}}
      localStorage.setItem('user', JSON.stringify(JSONres))

      dispatch({type: 'LOGIN', payload: JSONres})

      navigate('/')

      return
    }
  }

  return { signup, isLoading, error, setError }
}