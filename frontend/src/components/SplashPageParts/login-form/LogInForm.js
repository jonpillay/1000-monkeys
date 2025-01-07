import { useRef, useState } from "react";
import { useLogin } from "../../../hooks/useLogIn";
import './LogInForm.css'
import { redirect, useLocation } from "react-router";

const LogInForm = () => {
  const email = useRef()
  const password = useRef()
  const { login, isLoading, error } = useLogin()

  const location = useLocation()
  const [apiError, setApiError] = useState(location.state?.error) 
 
  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email.current.value, password.current.value)

    redirect('/create')

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
        </div>
        {error && <div className="error">{error}</div>}
        {apiError && <div className="error">{apiError}</div>}
      </form>
    </div>
  )
}

export default LogInForm;