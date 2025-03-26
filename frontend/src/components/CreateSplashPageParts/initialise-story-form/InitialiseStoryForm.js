import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router";
import DropdownSelector from "../dropdown-selector/DropdownSelector";
import "./InitialiseStoryForm.css";

import { useSelector } from "react-redux";
import { selectAllCharacters, selectAllArtStyles, selectAllGenres } from "../../app/systemInfoSlice";


import { useAuthContext } from "../../../hooks/useAuthContext";
import { useInitialiseStory } from "../../../hooks/useIntialiseCreateStory";
import { useSanitiseInput } from "../../../hooks/useSanitiseInput";
import { useCheckWordFormatting } from "../../../hooks/useCheckWordFormatting";
import { useMonitorUserWarnings } from "../../../hooks/useMonitorUserWarnings";
import { useCheckEggInput } from "../../../hooks/useCheckEggInput";
import { useLoadingContext } from "../../../hooks/useLoadingContext";

import { Tooltip } from 'react-tooltip'

import egg from '../../../img/egg.png'

const InitialiseStoryForm = (props) => {

  const location = useLocation()

  const {user} = useAuthContext()
  const navigate = useNavigate()

  const promptRef = useRef()

  const [characterChoice, setCharacterChoice] = useState();
  const [genreChoice, setGenreChoice] = useState();
  const [styleChoice, setStyleChoice] = useState();
  const [error, setError] = useState(location.state?.error)

  const charaters = useSelector(selectAllCharacters)
  const genres = useSelector(selectAllGenres)
  const artStyles = useSelector(selectAllArtStyles)

  const { sanitiseInput } = useSanitiseInput()
  const { checkWordFormatting } = useCheckWordFormatting()
  const { checkEggInput, guessResponse, setGuessResponse } = useCheckEggInput()

  const { initialiseStoryHook } = useInitialiseStory()
  const { handleUserWarning, userWarningMessage, setUserWarningMessage } = useMonitorUserWarnings()

  const { loadingDispatch } = useLoadingContext()

  useEffect(() => {

    if (!error) {
      setUserWarningMessage("")
    }

    let timeoutId;

    timeoutId = setTimeout(() => {
        setError("");
        setGuessResponse("")
        setUserWarningMessage("")
      }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [error, guessResponse]);


  const initialiseStory = async () => {

    if (user.credits < 10) {
      setError("Insufficient Credits. Contact Admin")
      return null
    } else {

      try {
        initialiseStoryHook(characterChoice, genreChoice, styleChoice, promptRef.current.value)
        localStorage.setItem('firstChapter', 'true')
      } catch(error) {
        console.log(error)
        setError("Creation Engine Error. Please Retry")
        loadingDispatch({type: 'LOADED'})
      }
    }
  }

  const initialiseStoryOnClick = async (e) => {

    if (!characterChoice) {
      setError("Please Select A Character.")
      return
    }    
    
    if (!genreChoice) {
      setError("Please Select A Genre.")
      return
    }

    if (!styleChoice) {
      setError("Please Select A Illistration Style.")
      return
    }

    if (!promptRef.current.value) {
      setError("Please Enter Your Story Prompt")
      return
    }

    loadingDispatch({type: 'LOADING'})

    setError("")

    const prompt = promptRef.current.value

    // needs to be slightly rewritten to remove whitespace and count the characters then.
    // At the moment will penalise inputs that contain lots of white space (shorter words).
    const promptLength = prompt.split("").length

    if (promptLength > 125) {
      setError("Max Prompt Length Exceeded")
      handleUserWarning()
      return
    } else {

      const eggTivated = await checkEggInput(prompt)

      if (eggTivated == true) {
        navigate('/', {
          state: {error: "Egg Activated!", warnedState: "EASTEREGGACTIVATED"},
        })
        return
      } else if (eggTivated == false) {
        setGuessResponse("Incorrect Guess! Please Try Again.")
        return
      }

      const wordFormattingCheck = checkWordFormatting(prompt)

      if (wordFormattingCheck == false) {
        loadingDispatch({type: 'LOADED'})
        setError("Prompt Input Cannot Contain Wild Card Characters")
        handleUserWarning()
        setTimeout(() => {
          setError("")
        }, 1500)
        return
      }

      const cleanCheck = await sanitiseInput(prompt)
  
      if (cleanCheck == true) {
  
        e.preventDefault();

        try {

          await initialiseStory()
    
          navigate('/create')
        } catch(error) {
          console.log(error)
        }
  

  
      } else if (cleanCheck == false) {
        loadingDispatch({type: 'LOADED'})
        setError("Please Check Our Community Standards")
        handleUserWarning()
        setTimeout(() => {
          setError("")
        }, 1500)
        return
      } else {
        loadingDispatch({type: 'LOADED'})
        setError(cleanCheck)
      }
    }


    // reduxDispatch(initialiseStory(characterChoice, genreChoice, styleChoice, GPTPrompt))

  };

  return (
    <>
    <div className="initialise-story-form-flex">
      <div className="formcontainer-container">
        <h1 className="formcontainer-title">
          Let's start at the beginning
        </h1>
        <div>
          <DropdownSelector
              dropdownItems={charaters}
              selectionField="Character"
              onDropdownChange={(e) => setCharacterChoice(e.value)}
          />
          <DropdownSelector
            dropdownItems={genres}
            selectionField="Genre"
            onDropdownChange={(e) => setGenreChoice(e.value)}
          />
          <DropdownSelector
            dropdownItems={artStyles}
            selectionField="Style"
            onDropdownChange={(e) => setStyleChoice(e.value)}
          />
        </div>
          <div className="initialise-user-prompt-input-container">
            <input ref={promptRef} className="initialise-user-prompt-input-box" maxLength={126} placeholder="The first story beat..."/>
          </div>
          <button onClick={initialiseStoryOnClick} type="submit" className="submit-button">
            Start Your Adventure!
          </button>
          <div className="initialise-story-prompt-error-container">
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
            <div className="initialise-story-prompt-error">
              { guessResponse && (
                <>
                {guessResponse}
                </>
              )}
            </div>
          </div>
      </div>
      <div className="splash-egg-container">
        <Tooltip id="splash-egg-tooltip" />
        <a href="https://github.com/jonpillay/AI-tistic-Tales-JP-Remix/blob/main/frontend/src/hooks/useCheckEggInput.js" target="_blank" rel="noopener noreferrer" data-tooltip-id="splash-egg-tooltip" data-tooltip-content="6-20">
          <img className="splash-egg" src={egg}/> 
        </a>
      </div>
    </div>
    </>
  );
};

export default InitialiseStoryForm;