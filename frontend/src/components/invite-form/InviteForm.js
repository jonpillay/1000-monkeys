import { useState, useRef } from "react";
import { useLogin } from "../../hooks/useLogIn";
import './LogInForm.css'

const InviteForm = () => {
  const email = useRef()
  const password = useRef()
  const { login, isLoading, error } = useLogin()
 
  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email.current.value, password.current.value)

  }

  return (
    <div className="form-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="user-title-container">
          <div className="user-title">Adventurer's Log In</div>
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
          <button disabled={isLoading} className="submit-button" id="user-submit-button" type="submit">LOGIN</button>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  )
}

export default InviteForm;