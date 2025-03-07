import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const baseUrl = process.env.REACT_APP_API_URL || '';

export const useNewUser = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const {user}  = useAuthContext()

  const newUser = async (email, invite_code, credits_issued=50) => {
    setIsLoading(true)
    setError(null)

    if (!user) {
      setError("Must be logged in")
      setIsLoading(false)
    }

    const reqBody = {
      email: email,
      invite_code: invite_code,
      credits_issued: credits_issued
    }

    const response = await fetch(`${baseUrl}/user/newuser`, {
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