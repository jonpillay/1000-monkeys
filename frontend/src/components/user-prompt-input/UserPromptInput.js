import { useState, useRef, useEffect } from "react";
import { useCreateStory } from "../../hooks/useCreateStory";
import './UserPromptInput.css'

const UserPromptInput = (props) => {
  const prompt = useRef()
  const { userPromtNextChapter, isLoading } = props;

  const handleSubmit = async (e) => {
    e.preventDefault()
    await userPromtNextChapter(prompt.current.value)
  }

  return (
    <>
      <div className="user-prompt-input-container">
        <form className="user-prompt-input-form" onSubmit={handleSubmit}>
          <div className="user-prompt-input-title-container">
            <div className="user-prompt-input-title">What happens next?</div>
          </div>
          <div className="user-prompt-text-input-container">
            <div>
              <input type="text" className="user-prompt-input-box" ref={prompt} placeholder="Imagine..."/>
            </div>
            <div className="user-prompt-input-submit-container">
              <button disabled={isLoading} className="user-prompt-input-button" id="user-prompt-input-submit-button" type="submit">Create</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default UserPromptInput;