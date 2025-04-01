import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CreditsContext } from "../context/CreditsContext";

import { useDispatch } from "react-redux";
import { setUserToken } from "../components/Pages/create-stories-page/storyBookSysInfoSlice";
import { initiliseSystemInfo } from "../components/app/systemInfoSlice";

const baseUrl = process.env.NODE_ENV === 'production' ? window.env.API_URL : '';

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useContext(AuthContext)
  const { creditDispatch } = useContext(CreditsContext)
  const reduxDispatch = useDispatch()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${baseUrl}/user/login`, {
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
      if (JSONres.systemInfo != null) {
        console.log("login sysinfo fired")
        console.log(JSONres.systemInfo)
        const AiEngineVer = JSONres.systemInfo.AiEngineVer
        const characters = JSONres.systemInfo.characters
        const genres = JSONres.systemInfo.genres
        const artStyles = JSONres.systemInfo.artStyles

        reduxDispatch(initiliseSystemInfo(AiEngineVer, characters, genres, artStyles))
      }
      reduxDispatch(setUserToken(JSONres.token))
      creditDispatch({type: 'UPDATE', payload: JSONres.credits})
      localStorage.setItem('credits', JSONres.credits)
      localStorage.setItem('user', JSON.stringify(JSONres))
      localStorage.removeItem('isLoading')

      dispatch({type: 'LOGIN', payload: JSONres})

      setIsLoading(false)

      // navigate('/start-your-story')
    }
  }

  return { login, isLoading, error, setError }
}