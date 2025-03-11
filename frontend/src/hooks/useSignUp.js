import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { redirect } from "react-router";
import { useNavigate } from "react-router-dom";
import { useAcceptTerms } from "./useAcceptTerms";

const baseUrl = process.env.NODE_ENV === 'production' ? window.env.API_URL : '';

export const useSignup = () => {

  const navigate = useNavigate();

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const { showTerms, acceptTerms, termsAccepted, setTermsAccepted } = useAcceptTerms()

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
      localStorage.removeItem('activateLocal')
      localStorage.removeItem('activateEndtime')
      localStorage.setItem('user', JSON.stringify(JSONres))

      dispatch({type: 'LOGIN', payload: JSONres})

      navigate('/terms-of-use', { state: { termsNotAccepted: true } })

      return
    }
  }

  return { signup, isLoading, error }
}