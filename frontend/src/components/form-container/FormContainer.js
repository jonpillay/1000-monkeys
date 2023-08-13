import React, { useState, useEffect, useRef, useContext } from "react";
import Form from "../forms/Form";
import TextInput from "../text-input-form/TextInput";
import "./form-container.css";
import SignupForm from "../signup-form/SignupForm"
import LogInForm from "../login-form/LogInForm";
import { useNavigate } from "react-router";

import { StoryContext } from "../../context/StoryContext";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useStoryContext } from "../../hooks/useStoryContext";

const FormContainer = () => {
  const {user} = useAuthContext()
  console.log(user)
  const [characterOptions, setCharacterOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [styleOptions, setStyleOptions] = useState([]);

  const promptRef = useRef()

  // const [isAnimationVisible, setIsAnimationVisible] = useState(true);

  const [characterChoice, setCharacterChoice] = useState([]);
  const [genreChoice, setGenreChoice] = useState([]);
  const [styleChoice, setStyleChoice] = useState([]);

  const navigate = useNavigate()

  const { dispatch } = useContext(StoryContext)

  useEffect(() => {
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

  async function initialiseLocal(prompts, choices, pages, sys) {
    return new Promise((resolve) => {
    localStorage.removeItem("GPTPromptHistory")
    localStorage.removeItem("userChoices");
    localStorage.removeItem("storyPages");
    localStorage.removeItem("sysInfo")

    localStorage.setItem("GPTPromptHistory", JSON.stringify(prompts))
    localStorage.setItem("userChoices", JSON.stringify(choices));
    localStorage.setItem("storyPages", JSON.stringify(pages));
    localStorage.setItem("sysInfo", JSON.stringify(sys))
    resolve()
    })
  }

  const handleFormSubmit = async (e) => {

    e.preventDefault();

    let userChoices = {
      "character": characterChoice,
      "genre": genreChoice,
      "style": styleChoice,
      "messageHistory": [],
      "imageHistory": []
    }

    let GPTPromptHistory = [{
      role: "user",
      content: promptRef.current.value
    }]

    let storyPages = {
      "textHistory": ["This is some text"],
      "imageHistory": ["this is a URL"]
    }

    let sysInfo = {
      "currentPage": -1,
      "firstLoad": true
    }

    console.log(userChoices)
    console.log(GPTPromptHistory)

    await initialiseLocal(GPTPromptHistory, userChoices, storyPages, sysInfo)

    dispatch({type: 'BEGIN'})

    navigate("/results");
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
