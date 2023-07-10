import React, { useState, useRef } from 'react';
import TextInput from '../text-input-form/TextInput';
import './SteerStory.css';
import '../result-page/ResultPage.css'

function SteerStory({ callback }) {
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const promptRef = useRef()

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleButtonClick();
    callback(promptRef.current.value)
  };

  const handleButtonClick = () => {
    setIsButtonPressed((state) => !state);
  };

  return (
    <div className='prompt-form'>
      {isButtonPressed ? (
        <form className="prompt-steer-input" onSubmit={handleFormSubmit}>
          <TextInput label="Prompt" ref={promptRef} />
          <button className="steer-button" data-cy="steer-submit" type="submit">Craft the next chapter</button>
          <button className="steer-button" data-cy="steer-cancel" onClick={handleButtonClick}>Cancel</button>
        </form>
      ) : (
        <button data-cy="steer-initiate" className="steer-button" onClick={handleButtonClick}>
          Steer this story
        </button>
      )}
    </div>
  );
}

export default SteerStory;
