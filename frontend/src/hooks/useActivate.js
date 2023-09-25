import { useState, useContext, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { useTimer } from "./useTimer";

export const useActivate = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [ signupActive, setSignupActive ] = useState()
  const { setTimer } = useTimer()
  const user = useAuthContext()

  useEffect(()=> {
    const endTime = parseInt(localStorage.getItem('activateEndtime'))
    console.log("This is the now time ", Date.now())
    console.log(typeof endTime)
    if (Date.now() > endTime) {
      console.log("I did this")
      localStorage.clear()
      setSignupActive(false)
    } else if (localStorage.getItem('activateLocal')) {
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

      const endTime = Date.now() + 599000

      setTimer(setSignupActive, 599000, 'activateLocal')

      await localStorage.setItem('activateEndtime', endTime.toString())

    }
  }

  return { activate, isLoading, error, signupActive, setSignupActive }
}