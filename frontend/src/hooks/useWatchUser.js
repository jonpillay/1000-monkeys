import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const baseUrl = process.env.NODE_ENV === 'production' ? window.env.API_URL : '';

export const useWatchUser = () => {
  const [error, setError] = useState(null)
  const {user}  = useAuthContext()

  const watchUser = async () => {
    setError(null)

    if (!user) {
      setError("No User To Watch")
    }

    const reqBody = {}

    const response = await fetch(`${baseUrl}/user/watch-user`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(reqBody)
    })

    const JSONres = await response.json()

    if (!response.ok) {
      setError(JSONres.error)
    }

    if (response.ok) {
      setError("User Watched!")
    }
  }

  return { watchUser, error }
}