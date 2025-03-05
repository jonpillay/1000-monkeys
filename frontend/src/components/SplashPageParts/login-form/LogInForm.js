import { useRef, useState, useEffect } from "react";
import { useLogin } from "../../../hooks/useLogIn";
import './LogInForm.css'
import { redirect, useLocation } from "react-router";

const LogInForm = () => {
  const email = useRef()
  const password = useRef()
  const { login, isLoading, error } = useLogin()


  const location = useLocation()
  const [apiError, setApiError] = useState(location.state?.error)
  const [loginError, setLoginError] = useState()

  useEffect(() => {
  
      setLoginError(error)

      let timeoutId;
  
      timeoutId = setTimeout(() => {
          setLoginError("");
          setApiError("");
        }, 2000);
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, [error, apiError]);


 
  const handleSubmit = async (e) => {

    setLoginError("")
    setApiError("")

    e.preventDefault()

    await login(email.current.value, password.current.value)

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
            <input type="email" className="user-input-box" ref={email} placeholder="email..."/>
          </div>
          <div>
            <input type="password" className="user-input-box" ref={password} placeholder="password..."/> 
          </div>
        </div>
        <div className="user-submit-container">
          <button disabled={isLoading} className="login-form-button" type="submit">LOGIN</button>
        </div>
        {loginError && <div className="error">{loginError}</div>}
      </form>
    </div> 
  )
}

export default LogInForm;