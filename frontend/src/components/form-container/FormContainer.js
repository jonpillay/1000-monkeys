import React, { useState, useEffect, useRef } from "react";
import Form from "../forms/Form";
import TextInput from "../text-input-form/TextInput";
import "./form-container.css";
import logo from "./homepageLogo.gif";

const FormContainer = ({ navigate }) => {
  const [characterOptions, setCharacterOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [styleOptions, setStyleOptions] = useState([]);

  const promptRef = useRef()

  const [isAnimationVisible, setIsAnimationVisible] = useState(true);

  const [characterChoice, setCharacterChoice] = useState([]);
  const [genreChoice, setGenreChoice] = useState([]);
  const [styleChoice, setStyleChoice] = useState([]);



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

  useEffect(() => {
    const animationDuration = 3000;
    const animationTimeout = setTimeout(() => {
      setIsAnimationVisible(false);
    }, animationDuration);

    return () => {
      clearTimeout(animationTimeout);
    };
  }, []);

  const handleFormSubmit = (e) => {
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
      "textHistory": [],
      "imageHistory": []
    }

    let sysInfo = {
      "currentPage": -1,
      "firstLoad": true
    }

    console.log(userChoices)
    console.log(GPTPromptHistory)

    localStorage.clear()
    localStorage.setItem("GPTPromptHistory", JSON.stringify(GPTPromptHistory))
    localStorage.setItem("userChoices", JSON.stringify(userChoices));
    localStorage.setItem("storyPages", JSON.stringify(storyPages));
    localStorage.setItem("sysInfo", JSON.stringify(sysInfo))

    navigate("/results");
  };

  return (
      <div className="formcontainer">
        {isAnimationVisible && (
          <img className="formcontainer-logo-gif" src={logo} alt="test" />
        )}
        {!isAnimationVisible && (
      <div className="formcontainer-container">
        <h1 className="formcontainer-title">
          Get started with some details...
        </h1>
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
          
          <button onClick={handleFormSubmit} type="submit" className="formcontainer-submit-button">
            Submit
          </button>
      </div>
      )}
    </div>
  );
};

export default FormContainer;
