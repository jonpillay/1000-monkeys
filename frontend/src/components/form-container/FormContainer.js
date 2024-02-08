import { useState, useEffect, useRef, useContext } from "react";
import Form from "../forms/Form";
import TextInput from "../text-input-form/TextInput";
import "./form-container.css";
import SignupForm from "../signup-form/SignupForm"
import LogInForm from "../login-form/LogInForm";

import { StoryContext } from "../../context/StoryContext";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useStoryContext } from "../../hooks/useStoryContext";

import { useDispatch, useSelector } from "react-redux";

import { addChapter, nextPage, previousPage, turnToPage, turnToLastPage, selectRenderChapter, selectAllChapterImages } from "../story-book/storyBookSlice";
import { initialiseStory } from "../create-stories-page/storyBookSysInfoSlice";

import { useCreateStory } from "../../hooks/useCreateStory";

const FormContainer = (props) => {
  const {user} = useAuthContext()
  const [characterOptions, setCharacterOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [styleOptions, setStyleOptions] = useState([]);

  const promptRef = useRef()

  // const [isAnimationVisible, setIsAnimationVisible] = useState(true);

  const [characterChoice, setCharacterChoice] = useState([]);
  const [genreChoice, setGenreChoice] = useState([]);
  const [styleChoice, setStyleChoice] = useState([]);
  const [error, setError] = useState("")

  const { dispatch } = useContext(StoryContext)
  const reduxDispatch = useDispatch()

  const { AIGenCall, userPromtNextChapter, AIPromptNextChapter, refreshStory, refreshImage, storyInSync, setStoryInSync, isLoading, setIsLoading, storyPages } = useCreateStory()


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

  const handleFormSubmit = async (e) => {

    // if (user.credits < 10) {
    //   setError("Infufficient Credits. Contact Admin")
    //   return null
    // }

    e.preventDefault();

    AIGenCall()

    const GPTPrompt = {
      role: "user",
      content: promptRef.current.value
    }

    reduxDispatch(initialiseStory(characterChoice, genreChoice, styleChoice, GPTPrompt))
  };

  return (
    <>
      {user && (
      <div className="formcontainer-container">
        <div>
          <h1 className="formcontainer-title">
            Let's start at the beginning
          </h1>
        </div>
        <div>
          <Form
              dropdownItems={characterOptions}
              selectionField="Character"
              onDropdownChange={(e) => setCharacterChoice(e.value)}
          />
          <Form
            dropdownItems={genreOptions}
            selectionField="Genre"
            onDropdownChange={(e) => setGenreChoice(e.value)}
          />
          <Form
            dropdownItems={styleOptions}
            selectionField="Style"
            onDropdownChange={(e) => setStyleChoice(e.value)}
          />
          <TextInput
            label="Prompt"
            ref={promptRef}
          />
          <button onClick={handleFormSubmit} type="submit" className="submit-button">
            Start Your Adventure!
          </button>
          { error && (
            <>
            {error}
            </>
          )}
        </div>
      </div>
      )}
      {!user && (
        <>
        <LogInForm/>
        </>
      )}
    </>
  );
};

export default FormContainer;