import React, { useState } from 'react';
import TextInput from '../text-input-form/TextInput';

function SteerStory({ callback }) {
  const [storyPrompt, steerStoryPrompt] = useState('');
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleButtonClick();
    callback(storyPrompt)
  };

  const handleInputChange = (inputText) => {
    steerStoryPrompt(inputText);
  };

  const handleButtonClick = () => {
    setIsButtonPressed((state) => !state);
  };

  return (
    <div>
      {isButtonPressed ? (
        <form onSubmit={handleFormSubmit}>
          <TextInput handleInputChange={handleInputChange} textField="Prompt" />
          <button className="submit-button" data-cy="steer-submit" type="submit">Craft the next chapter</button>
          <button className="submit-button" data-cy="steer-cancel" onClick={handleButtonClick}>Cancel</button>
        </form>
      ) : (
        <button data-cy="steer-initiate" className="submit-button" onClick={handleButtonClick}>
          Steer this story
        </button>
      )}
    </div>
  );
}

export default SteerStory;
