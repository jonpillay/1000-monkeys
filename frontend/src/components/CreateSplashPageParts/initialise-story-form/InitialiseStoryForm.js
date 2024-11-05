import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import DropdownSelector from "../dropdown-selector/DropdownSelector";
import "./InitialiseStoryForm.css";

import { StoryContext } from "../../../context/StoryContext";

import { useAuthContext } from "../../../hooks/useAuthContext";
import { useStoryContext } from "../../../hooks/useStoryContext";

import { useDispatch, useSelector } from "react-redux";

import { addChapter, nextPage, previousPage, turnToPage, turnToLastPage, selectRenderChapter, selectAllChapterImages } from "../../CreateStoryPageParts/story-book-create/storyBookSlice";
import { initialiseStory } from "../../Pages/create-stories-page/storyBookSysInfoSlice";

import { useInitialiseStory } from "../../../hooks/useIntialiseCreateStory";

import { useSanitiseInput } from "../../../hooks/useSanitiseInput";

const InitialiseStoryForm = (props) => {
  const {user} = useAuthContext()
  const navigate = useNavigate()

  const [characterOptions, setCharacterOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [styleOptions, setStyleOptions] = useState([]);

  const promptRef = useRef()

  // const { initialiseStoryHook } = useInitialiseStory()

  // const [isAnimationVisible, setIsAnimationVisible] = useState(true);

  const [characterChoice, setCharacterChoice] = useState([]);
  const [genreChoice, setGenreChoice] = useState([]);
  const [styleChoice, setStyleChoice] = useState([]);
  const [error, setError] = useState("")

  const { dispatch } = useContext(StoryContext)
  const reduxDispatch = useDispatch()

  const { sanitiseInput } = useSanitiseInput()

  const { initialiseStoryHook } = useInitialiseStory()

  // const { AIGenCall, userPromtNextChapter, AIPromptNextChapter, refreshStory, refreshImage, storyInSync, setStoryInSync, isLoading, setIsLoading, storyPages } = useCreateStory()


  useEffect(() => {
    setError(null)
    fetch("/populate", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setCharacterOptions(data.character)
        setStyleOptions(data.style)
        setGenreOptions(data.genre)
      });
  }, [])

  // const initialiseStoryOnClick = () => {

  //   initialiseStoryHook(characterChoice, genreChoice, styleChoice, promptRef)

  // }

  const initialiseStory = async () => {
    if (user.credits < 10) {
      setError("Infufficient Credits. Contact Admin")
      return null
    } else {
      initialiseStoryHook(characterChoice, genreChoice, styleChoice, promptRef.current.value)
      await dispatch({type: "BEGIN", payload: null})
      localStorage.setItem('firstChapter', 'true')
    }
  }

  const initialiseStoryOnClick = async (e) => {

    console.log("This runs")

    const cleanCheck = sanitiseInput(promptRef.current.value)

    console.log(cleanCheck)

    if (cleanCheck == true) {

      console.log("Passed")

      // e.preventDefault();

      // await initialiseStory()
  
      // navigate('/create')

    } else {

      console.log("Invlaid input")

    }



    // reduxDispatch(initialiseStory(characterChoice, genreChoice, styleChoice, GPTPrompt))

  };

  return (
      <div className="formcontainer-container">
        <div>
          <h1 className="formcontainer-title">
            Let's start at the beginning
          </h1>
        </div>
        <div>
          <DropdownSelector
              dropdownItems={characterOptions}
              selectionField="Character"
              onDropdownChange={(e) => setCharacterChoice(e.value)}
          />
          <DropdownSelector
            dropdownItems={genreOptions}
            selectionField="Genre"
            onDropdownChange={(e) => setGenreChoice(e.value)}
          />
          <DropdownSelector
            dropdownItems={styleOptions}
            selectionField="Style"
            onDropdownChange={(e) => setStyleChoice(e.value)}
          />
          <div>
            <input ref={promptRef} placeholder="Your first chapter..."/>
          </div>
          <button onClick={initialiseStoryOnClick} type="submit" className="submit-button">
            Start Your Adventure!
          </button>
          { error && (
            <>
            {error}
            </>
          )}
        </div>
      </div>
  );
};

export default InitialiseStoryForm;