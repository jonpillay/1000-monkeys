import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router";
import DropdownSelector from "../dropdown-selector/DropdownSelector";
import "./InitialiseStoryForm.css";

import { StoryContext } from "../../../context/StoryContext";

import { useAuthContext } from "../../../hooks/useAuthContext";
import { useStoryContext } from "../../../hooks/useStoryContext";

import { useDispatch, useSelector } from "react-redux";

import { addChapter, nextPage, previousPage, turnToPage, turnToLastPage, selectRenderChapter, selectAllChapterImages } from "../../CreateStoryPageParts/story-book-create/storyBookSlice";
import { initialiseStory, resetStorySysInfo } from "../../Pages/create-stories-page/storyBookSysInfoSlice";

import { useInitialiseStory } from "../../../hooks/useIntialiseCreateStory";

import { useSanitiseInput } from "../../../hooks/useSanitiseInput";

const dropdownSelections = require('./unifiedSelectors.json')

const InitialiseStoryForm = (props) => {

  const location = useLocation()

  console.log(dropdownSelections)
  const {user} = useAuthContext()
  const navigate = useNavigate()

  const [characterOptions, setCharacterOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [styleOptions, setStyleOptions] = useState([]);

  const promptRef = useRef()

  const [characterChoice, setCharacterChoice] = useState();
  const [genreChoice, setGenreChoice] = useState();
  const [styleChoice, setStyleChoice] = useState();
  const [error, setError] = useState(location.state?.error)

  const { dispatch } = useContext(StoryContext)
  const reduxDispatch = useDispatch()

  const { sanitiseInput } = useSanitiseInput()

  const { initialiseStoryHook } = useInitialiseStory()

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
      setError("Infufficient Credits. Contact Admin")
      return null
    } else {

      try {
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

    const promptLength = promptRef.current.value.length

    console.log(promptLength)

    if (promptLength > 125) {
      setError("Prompt Length Exceeded")
    } else {

      const cleanCheck = await sanitiseInput(promptRef.current.value)
  
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
            <input ref={promptRef} className="initialise-user-prompt-input-box" maxLength={125} placeholder="Your first chapter..."/>
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

        </div>
      </div>
  );
};

export default InitialiseStoryForm;