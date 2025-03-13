import { useRef, useState, useEffect } from "react";
import { useLogin } from "../../../hooks/useLogIn";
import './LogInForm.css'
import { redirect, useLocation } from "react-router";

const LogInForm = (props) => {
  const email = useRef()
  const password = useRef()

  const login = props.login
  const isLoading = props.isLoading
  const setError = props.setError
  const setApiError = props.setApiError
 
  const handleSubmit = async (e) => {

    setError("")
    setApiError("")

    e.preventDefault()

    await login(email.current.value.trim().toLowerCase(), password.current.value)

    redirect('/create')

  }

  return (
    <div className="login-form-container">
      <form className="login-user-form" onSubmit={handleSubmit}>
        <div className="user-title-container">
          <div className="user-title">Adventurer's Login</div>
        </div>
        <div className="login-input-container">
          <div>
            <input type="text" className="user-input-box" ref={email} placeholder="email..."/>
          </div>
          <div>
            <input type="password" className="user-input-box" ref={password} placeholder="password..."/> 
          </div>
        </div>
        <div className="user-submit-container">
          <button disabled={isLoading} className="login-form-button" type="submit">LOGIN</button>
        </div>
      </form>
    </div> 
  )
}

export default LogInForm;