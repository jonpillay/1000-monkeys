import { useState, useRef } from "react";
import { useCreateStory } from "../../../hooks/useCreateStory";
import { useSanitiseInput } from "../../../hooks/useSanitiseInput";
import './UserPromptInput.css'

import ForbiddenLogo from "../../../img/forbidden.png"

const UserPromptInput = (props) => {
  const prompt = useRef()
  const { userPromtNextChapter, isLoading } = props;
  const [error, setError] = useState("")

  const {sanitiseInput} = useSanitiseInput()
  
  const handleSubmit = async (e) => {

    e.preventDefault()

    const cleanCheck = await sanitiseInput(prompt.current.value)

    if (cleanCheck == true) {

      console.log("Passed")

      await userPromtNextChapter(prompt.current.value)

    } else {
      setError("Please Check Our Community Standards")
      setTimeout(() => {
        setError("")
      }, 1500)
      console.log("Invlaid input")

    }

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
              <input type="text" className="user-prompt-input-box" maxLength={125} ref={prompt} placeholder="Imagine..."/>
            </div>
            <>
            {! error ? 
              <div className="user-prompt-input-submit-container">
                <button disabled={isLoading} className="user-prompt-input-button" id="user-prompt-input-submit-button" type="submit">Create</button>
              </div>
              :
              <div className="user-prompt-input-submit-container">
                <img className="forbidden" src={ForbiddenLogo}/>
              </div>
              }
            </>
          </div>
        </form>
      </div>
    </>
  )
}

export default UserPromptInput;