import { useNavigate } from "react-router"
import { useState } from "react"

import { useAuthContext } from "./useAuthContext"

export const useAcceptTerms = () => {

  const baseUrl = process.env.NODE_ENV === 'production' ? window.env.API_URL : '';

  const { user } = useAuthContext()

  const [termsAccepted, setTermsAccepted] = useState(false)

  const [ touError, setTouError ] = useState()

  const { navigate } = useNavigate()

  const acceptTerms = async () => {

    const response = await fetch(`${baseUrl}/user/accept-terms`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify()
    })

    const JSONres = await response.json()

    if (!response.ok) {
      console.log(JSONres)
      setTouError("Terms not Accepted, Please Retry")
    }

    if (response.ok) {
      setTermsAccepted(true)
    }
  }

  return { acceptTerms, termsAccepted, setTermsAccepted, touError }

}