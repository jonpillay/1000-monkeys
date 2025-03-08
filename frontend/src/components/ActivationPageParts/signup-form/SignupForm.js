import { useState, useRef, useEffect } from "react";
import { useSignup } from "../../../hooks/useSignUp.js";
import './SignupForm.css'

import { useSanitiseInput } from "../../../hooks/useSanitiseInput";

import Counter from "../../AdminPageParts/counter/Counter.js"

const SignupForm = async () => {
  const signupEmail = useRef()
  const signupPassword = useRef()
  const username = useRef()
  const { signup, error, isLoading } = useSignup()

  const {sanitiseInput} = useSanitiseInput()

  const [ cleanCheckError, setCleancheckError ] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const cleanCheck = await sanitiseInput(username.current.value)

    if (cleanCheck == true) {
      await signup(signupEmail.current.value, signupPassword.current.value, username.current.value)
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
              <input type="password" name="signup-password" className="signup-input-box" ref={signupPassword} autocomplete="new-password"/> 
            </div>
            <div>
              <input type="text" name="signup-username" className="signup-input-box" ref={username} placeholder="username..."/> 
            </div>
          </div>
          <div className="signup-submit-container">
            <button disabled={isLoading} className="submit-button" id="signup-submit-button" type="submit">Sign Up</button>
          </div>
          {error && <div className="error">{error}</div>}
          {cleanCheckError && <div className="error">{cleanCheckError}</div>}
        </form>
      </div>
      <div className="countdown-notification-container">
        <Counter/>
        <div className="countdown-notification-text"> until activation expires.</div>
      </div>
    </>
  )
}

export default SignupForm;