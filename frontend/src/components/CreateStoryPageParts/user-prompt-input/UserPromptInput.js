import './UserPromptInput.css'
import { useState, useRef, useEffect } from "react";
import { useCheckWordFormatting } from "../../../hooks/useCheckWordFormatting";
import { useSanitiseInput } from "../../../hooks/useSanitiseInput";
import { useMonitorUserWarnings } from '../../../hooks/useMonitorUserWarnings';

import ForbiddenLogo from "../../../img/forbidden.png"

const UserPromptInput = (props) => {
  const prompt = useRef()
  const { userPromtNextChapter, isLoading } = props;
  const [error, setError] = useState("")

  const {sanitiseInput} = useSanitiseInput()
  const { checkWordFormatting } = useCheckWordFormatting()
  const { handleUserWarning, userWarningMessage, setUserWarningMessage } = useMonitorUserWarnings()
  
  const handleSubmit = async (e) => {

    e.preventDefault()

    const wordFormattingCheck = checkWordFormatting(prompt.current.value)

    if (wordFormattingCheck == false) {
      setError("Prompt Input Cannot Contain Wild Card Characters")
      handleUserWarning()
      setTimeout(() => {
        setError("")
        setUserWarningMessage("")
      }, 2500)
      return
    }

    const cleanCheck = await sanitiseInput(prompt.current.value)

    if (cleanCheck == true) {
      await userPromtNextChapter(prompt.current.value)

    } else {
      handleUserWarning()
      setError("Please Check Our Community Standards")
      setTimeout(() => {
        setError("")
        setUserWarningMessage("")
      }, 1500)
      console.log("Invlaid input")

    }

  }

  useEffect(() => {

    if (!error) {
      setUserWarningMessage("")
    }

    let timeoutId;

    timeoutId = setTimeout(() => {
        setError("");
        setUserWarningMessage("")
      }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [error]);

  return (
    <>
      {!userWarningMessage ? (
        <div className="user-prompt-input-container">
          <form className="user-prompt-input-form" onSubmit={handleSubmit}>
            <div className="user-prompt-input-title-container">
              <div className="user-prompt-input-title">What happens next?</div>
            </div>
            <div className="user-prompt-text-input-container">
              <div>
                <input type="text" className="user-prompt-input-box" maxLength={125} ref={prompt} placeholder="Prompt the next chapter..."/>
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
      ) : (
        <>
          <div className='user-prompt-error-messages'>
            <div>
              {error}
            </div>
            <div>
              {userWarningMessage}
            </div>
          </div>
    
        </>
      )}

    </>
  )
}

export default UserPromptInput;