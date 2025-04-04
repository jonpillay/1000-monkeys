import { useState, useContext, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { useTimer } from "./useTimer";

const baseUrl = process.env.NODE_ENV === 'production' ? window.env.API_URL : '';

export const useActivate = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [ signupActive, setSignupActive ] = useState()
  const { setTimer } = useTimer()
  const user = useAuthContext()

  useEffect(()=> {
    const endTime = parseInt(localStorage.getItem('activateEndtime'))

    if (Date.now() > endTime ||!endTime) {
      localStorage.clear()
      setSignupActive(false)
    } else if (localStorage.getItem('activateLocal')) {
      setTimer(setSignupActive, endTime, 'activateLocal')
      setSignupActive(true)
    }
  }, [])

  const activate = async (email, invite_code) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${baseUrl}/user/activate`, {
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

      const endTime = Date.now() + 599350

      setTimer(setSignupActive, endTime, 'activateLocal')

      localStorage.setItem('activateEndtime', endTime.toString())

    }
  }

  return { activate, isLoading, error, signupActive, setSignupActive }
}