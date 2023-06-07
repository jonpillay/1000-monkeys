import React, { useState } from 'react';
import TextInput from '../text-input-form/TextInput';

function SteerStory({ callback }) {
  const [steerprompt, steerStoryPrompt] = useState('');
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Craft the next chapter:', steerprompt);
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
          <button type="submit">Craft the next chapter</button>
          <button onClick={handleButtonClick}>Cancel</button>
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
