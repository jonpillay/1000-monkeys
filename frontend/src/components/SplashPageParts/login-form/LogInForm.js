import { useRef } from "react";
import { useLogin } from "../../../hooks/useLogIn";
import './LogInForm.css'
import { redirect } from "react-router";
import { useSanitiseInput } from "../../../hooks/useSanitiseInput";

const LogInForm = () => {
  const email = useRef()
  const password = useRef()
  const { login, isLoading, error } = useLogin()

  const { SanitiseInput } = useSanitiseInput()
 
  const handleSubmit = async (e) => {
    e.preventDefault()

    SanitiseInput(email.current.value)

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
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  )
}

export default LogInForm;