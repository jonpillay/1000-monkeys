import { useState, useRef } from "react";
import { useNewUser } from "../../../hooks/useNewUser";
import './CreateUserForm.css'

const CreateUserForm = () => {
  const email = useRef()
  const invite_code = useRef()
  const credits_issued = useRef()
  const { newUser, isLoading, error } = useNewUser()
 
  const handleSubmit = async (e) => {
    e.preventDefault()

    await newUser(email.current.value, invite_code.current.value, credits_issued.current.value)

  }

  return (
    <div className="form-container">
      <form className="new-user-form" onSubmit={handleSubmit}>
        <div className="user-title-container">
          <div className="user-title">New User</div>
        </div>
        <div className="new-user-input-container">
          <div>
            <input type="email" className="new-user-input-box" ref={email} placeholder="email..."/> 
          </div>
          <div>
            <input type="text" className="new-user-input-box" ref={invite_code} placeholder="Invite Code..."/> 
          </div>
          <div>
            <input type="text" className="new-user-input-box" ref={credits_issued} placeholder="Credits Issued..."/> 
          </div>
        </div>
        <div className="user-submit-container">
          <button disabled={isLoading} className="submit-button" id="user-submit-button" type="submit">Create User</button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default CreateUserForm;