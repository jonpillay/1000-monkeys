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
    <div className='prompt-form-container'>
      {isButtonPressed ? (
        <form className="prompt-form" onSubmit={handleFormSubmit}>
          {/* TextInput needs to be rewriten */}
          <TextInput label="Prompt" ref={promptRef} />
          <button className="steer-button" id='craft-chapter' data-cy="steer-submit" type="submit">Craft the next chapter</button>
          <button className="steer-button" id='cancel-prompt' data-cy="steer-cancel" onClick={handleButtonClick}>Cancel</button>
        </form>
      ) : (
        <button data-cy="steer-initiate" className="steer-button" id='init-steer-button' onClick={handleButtonClick}>
         <text>Continue the Adventure</text>
        </button>
      )}
    </div>
  );
}

export default SteerStory;
