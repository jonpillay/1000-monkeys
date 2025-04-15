import './UserPublishToggleButton.css'

import { useState } from 'react'

const UserPublishToggleButton = (props) => {

  const userPublishable = props.userPublishable
  const userPublishChoice = props.userPublishChoice
  const setUserPublishChoice = props.setUserPublishChoice

  const handleToggle = (e) => {
    
    e.preventDefault()

    setUserPublishChoice((prev) => !prev)

  }

  return (
    <>
      <div className="user-publish-button-container">
        <button disabled={!userPublishable} className="user-publish-button" onClick={handleToggle}>
          {userPublishChoice? "Create" : "Publish" }
        </button>
      </div>
    </>
  )
}
    
export default UserPublishToggleButton;