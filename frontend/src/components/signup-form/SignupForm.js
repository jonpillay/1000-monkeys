import { useState, useRef, useEffect } from "react";
import { useSignup } from "../../hooks/useSignUp";
import './SignupForm.css'

import Counter from "../counter/Counter.js"

const SignupForm = () => {
  const email = useRef()
  const password = useRef()
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email.current.value, password.current.value)

    console.log(email.current.value)
    console.log(password.current.value)

  }

  return (
    <>
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-title-container">
            <div className="signup-title">Adventurer's Sign Up</div>
          </div>
          <div className="input-container">
            <div>
              <input type="email" className="user-input-box" ref={email} placeholder="email..."/> 
            </div>
            <div>
              <input type="password" className="user-input-box" ref={password} placeholder="password..."/> 
            </div>
          </div>
          <div className="signup-submit-container">
            <button disabled={isLoading} className="submit-button" id="signup-submit-button" type="submit">Sign Up</button>
            {error && <div className="error">{error}</div>}
          </div>
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