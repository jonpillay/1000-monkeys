import { useState, useRef, useEffect } from "react";
import { useSignup } from "../../../hooks/useSignUp.js";
import './SignupForm.css'

import { useSanitiseInput } from "../../../hooks/useSanitiseInput";

import Counter from "../../AdminPageParts/counter/Counter.js"

const SignupForm = (props) => {
  const signupEmail = useRef()
  const signupPassword = useRef()
  const username = useRef()

  const termsAccepted = props.termsAccepted
  const acceptTerms = props.acceptTerms

  const { signup, isLoading, error, setError } = useSignup()

  const {sanitiseInput} = useSanitiseInput()

  const [ cleanCheckError, setCleancheckError ] = useState()
  const [ formError, setFormError ] = useState()

  useEffect(() => {

    let timeoutId;

    timeoutId = setTimeout(() => {
        setFormError("");
        setCleancheckError("")
        setError("")
      }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [error, formError, cleanCheckError]);

  const handleSubmit = async (e) => {

    e.preventDefault()

    // probably won't run as form input is 'email' field
    if (!signupEmail.current.value) {
      setFormError("Please Enter An Email Address")
      return
    }

    if (!signupPassword.current.value) {
      setFormError("Please Enter A Password.")
      return
    }

    if (!username.current.value) {
      setFormError("Please Enter A Username.")
      return
    }

    const cleanCheck = await sanitiseInput(username.current.value)

    if (cleanCheck == true) {
      try {
        await acceptTerms()
        await signup(signupEmail.current.value.trim().toLowerCase(), signupPassword.current.value.trim(), username.current.value.trim().toLowerCase())
      } catch (error) {
        console.log(error)
        setCleancheckError(error.error)
        return
      }
    } else {
      setCleancheckError("Please Check Our Community Standards")
      return
    }
  }

  return (
    <>
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="signup-title-container">
            <div className="signup-title">Adventurer's Sign Up</div>
          </div>
          <div className="signup-input-container">
            <div>
              <input type="email" name="signup-email" className="signup-input-box" ref={signupEmail} placeholder="email..."/> 
            </div>
            <div>
              <input type="password" name="signup-password" className="signup-input-box" ref={signupPassword} placeholder="password..." autoComplete="new-password"/> 
            </div>
            <div>
              <input type="text" name="signup-username" className="signup-input-box" ref={username} placeholder="username..."/> 
            </div>
          </div>
          <div className="signup-submit-container">
            <button disabled={isLoading || !termsAccepted} className="submit-button" id="signup-submit-button" type="submit">Sign Up</button>
          </div>
        </form>
        <div className="countdown-notification-container">
          <Counter/>
          <div className="countdown-notification-text"> until activation expires.</div>
        </div>
        <div className="signup-error-container">
          {error && <div className="signup-form-error">{error}</div>}
          {cleanCheckError && <div className="signup-form-error">{cleanCheckError}</div>}
          {formError && <div className="signup-form-error">{formError}</div>}
        </div>
      </div>
    </>
  )
}

export default SignupForm;