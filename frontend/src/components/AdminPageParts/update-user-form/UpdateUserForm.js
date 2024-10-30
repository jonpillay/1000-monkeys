import { useState, useRef } from "react";
import { useLogin } from "../../../hooks/useLogIn";
import './UpdateUserForm.css'
import Select from 'react-select';

const UpdateUserForm = () => {
  const email = useRef()
  const invite_code = useRef()
  const is_super = useRef()
  const { login, isLoading, error } = useLogin()
 
  const handleSubmit = async (e) => {
    e.preventDefault()

    

  }

  return (
    <div className="form-container">
      <form className="admin-user-form" onSubmit={handleSubmit}>
        <div className="user-title-container">
          <div className="user-title">Edit User</div>
        </div>
        <div className="admin-input-container">
          <div>
            <input type="email" className="user-input-box" ref={email} placeholder="email..."/> 
          </div>
          <div>
            <input type="text" className="user-input-box" ref={invite_code} placeholder="invite_code..."/> 
          </div>
        </div>
        <div className="user-submit-container">
          <button disabled={isLoading} className="submit-button" id="user-submit-button" type="submit">Update User</button>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  )
}

export default UpdateUserForm;