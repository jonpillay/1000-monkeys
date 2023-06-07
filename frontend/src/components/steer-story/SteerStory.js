import React, { useState } from 'react';
import TextInput from '../text-input-form/TextInput';

function SteerStory({ isButtonPressed, handleButtonClick, handleButtonCancelClick }) {
  const [steerprompt, steerStoryPrompt] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Craft the next chapter:', steerprompt);
  };

  const handleInputChange = (inputText) => {
    steerStoryPrompt(inputText);
  };

  return (
    <div>
      {isButtonPressed ? (
        <form onSubmit={handleFormSubmit}>
          <TextInput handleInputChange={handleInputChange} textField="Prompt" />
          <button type="submit">Craft the next chapter</button>
          <button onClick={handleButtonCancelClick}>Cancel</button>
        </form>
      ) : (
        <button className="submit-button" onClick={handleButtonClick}>
          Steer this story
        </button>
      )}
    </div>
  );
}

export default SteerStory;
