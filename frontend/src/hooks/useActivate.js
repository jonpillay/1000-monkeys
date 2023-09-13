import { useState, useContext, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { useTimer } from "./useTimer";

import { useStoryContext } from "./useStoryContext";
import { AuthContext } from "../context/AuthContext";


export const useActivate = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [ signupActive, setSignupActive ] = useState(false)
  const { setTimer } = useTimer()
  const user = useAuthContext()

  useEffect(()=> {
    if (localStorage.getItem('activateLocal')) {
      setSignupActive(true)
    }
  }, [])

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
      setSignupActive(true)
      const {email, token, error } = JSONres

      const activateLocalStorage = {email, token}

      localStorage.setItem('activateLocal', JSON.stringify(activateLocalStorage))

      const endTime = Date.now() + 599400

      setTimer(setSignupActive, endTime, activateLocalStorage)

      localStorage.setItem('activateEndtime', endTime.toString())
    }
  }

  return { activate, isLoading, error, signupActive }
}