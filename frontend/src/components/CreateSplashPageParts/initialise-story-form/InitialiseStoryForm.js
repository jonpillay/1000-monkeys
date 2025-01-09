import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router";
import DropdownSelector from "../dropdown-selector/DropdownSelector";
import "./InitialiseStoryForm.css";

import { useAuthContext } from "../../../hooks/useAuthContext";
import { useInitialiseStory } from "../../../hooks/useIntialiseCreateStory";
import { useSanitiseInput } from "../../../hooks/useSanitiseInput";
import { useMonitorUserWarnings } from "../../../hooks/useMonitorUserWarnings";

const dropdownSelections = require('./unifiedSelectors.json')

const InitialiseStoryForm = (props) => {

  const location = useLocation()

  const {user} = useAuthContext()
  const navigate = useNavigate()

  const promptRef = useRef()

  const [characterChoice, setCharacterChoice] = useState();
  const [genreChoice, setGenreChoice] = useState();
  const [styleChoice, setStyleChoice] = useState();
  const [error, setError] = useState(location.state?.error)

  const { sanitiseInput } = useSanitiseInput()

  const { initialiseStoryHook } = useInitialiseStory()
  const { handleUserWarning, userWarningMessage } = useMonitorUserWarnings()

  useEffect(() => {

    let timeoutId;

    timeoutId = setTimeout(() => {
        setError("");
      }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [error]);


  const initialiseStory = async () => {

    if (user.credits < 10) {
      setError("Insufficient Credits. Contact Admin")
      return null
    } else {

      try {
        console.log("we are here")
        initialiseStoryHook(characterChoice, genreChoice, styleChoice, promptRef.current.value)
        localStorage.setItem('firstChapter', 'true')
      } catch(error) {
        console.log(error)
        setError("Creation Engine Error. Please Retry")
      }
    }
  }

  const initialiseStoryOnClick = async (e) => {

    setError("")

    const prompt = promptRef.current.value

    const promptLength = prompt.length

    console.log(promptLength)

    if (promptLength > 125) {
      setError("Max Prompt Length Exceeded")
      handleUserWarning()
    } else {

      const cleanCheck = sanitiseInput(prompt)
  
      if (cleanCheck == true) {
  
        e.preventDefault();
  
        await initialiseStory()
    
        navigate('/create')
  
      } else if (cleanCheck == false) {
  
        setError("Please Check Our Community Standards")
        setTimeout(() => {
          setError("")
        }, 1500)
      } else {
        setError(cleanCheck)
      }
    }


    // reduxDispatch(initialiseStory(characterChoice, genreChoice, styleChoice, GPTPrompt))

  };

  return (
      <div className="formcontainer-container">
        <h1 className="formcontainer-title">
          Let's start at the beginning
        </h1>
        <div>
          <DropdownSelector
              dropdownItems={dropdownSelections["characters"]}
              selectionField="Character"
              onDropdownChange={(e) => setCharacterChoice(e.value)}
          />
          <DropdownSelector
            dropdownItems={dropdownSelections["genres"]}
            selectionField="Genre"
            onDropdownChange={(e) => setGenreChoice(e.value)}
          />
          <DropdownSelector
            dropdownItems={dropdownSelections["style"]}
            selectionField="Style"
            onDropdownChange={(e) => setStyleChoice(e.value)}
          />
          <div className="initialise-user-prompt-input-container">
            <input ref={promptRef} className="initialise-user-prompt-input-box" maxLength={126} placeholder="Your first chapter..."/>
          </div>
          <button onClick={initialiseStoryOnClick} type="submit" className="submit-button">
            Start Your Adventure!
          </button>
          <div className="initialise-story-prompt-error">
            { error && (
              <>
              {error}
              </>
            )}
          </div>
          <div className="initialise-story-prompt-error">
            { userWarningMessage && (
              <>
              {userWarningMessage}
              </>
            )}
          </div>
        </div>
      </div>
  );
};

export default InitialiseStoryForm;