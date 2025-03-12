import { useState } from "react"

export const useAcceptTerms = () => {

  const baseUrl = process.env.NODE_ENV === 'production' ? window.env.API_URL : '';

  const [termsAccepted, setTermsAccepted] = useState(false)

  const [ touError, setTouError ] = useState()

  const acceptTerms = async () => {

    if (!termsAccepted) {
      setTouError("Please Accept Our Term Of Use")
      return
    }

    const activateCreds = JSON.parse(localStorage.getItem('activateLocal'))

    const response = await fetch(`${baseUrl}/user/accept-terms`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${activateCreds.token}`
      },
      body: JSON.stringify({email:activateCreds.email})
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