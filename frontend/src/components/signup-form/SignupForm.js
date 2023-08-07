import { useState, useRef } from "react";
import { useSignup } from "../../hooks/useSignUp";
import './SignupForm.css'

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
    <div className="form-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="user-title-container">
          <div className="user-title">Adventurer's Sign Up</div>
        </div>
        <div className="input-container">
          <div>
            <input type="email" className="user-input-box" ref={email} placeholder="email..."/> 
          </div>
          <div>
            <input type="password" className="user-input-box" ref={password} placeholder="password..."/> 
          </div>
        </div>
        <div className="user-submit-container">
          <button disabled={isLoading} className="submit-button" id="user-submit-button" type="submit">Sign Up</button>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>

  )
}

export default SignupForm;