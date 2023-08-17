import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


export const useNewUser = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const {user}  = useAuthContext()

  if (user) {
    console.log(user.token)
  }
  

  const newUser = async (email, invite_code) => {
    setIsLoading(true)
    setError(null)

    const reqBody = {
      email: email,
      invite_code: invite_code
    }

    const response = await fetch('./user/newuser', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(reqBody)
    })

    const JSONres = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(JSONres.error)
    }

    if (response.ok) {

      setError("User Created!")
      setIsLoading(false)
    }
  }

  return { newUser, isLoading, error }
}