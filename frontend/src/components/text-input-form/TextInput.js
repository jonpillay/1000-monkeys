import { useState } from 'react';

const TextInput = ({ handleInputChange }) => {

  const [textInput, setTextInput] = useState("");

  const handleFormChange = (event) => {
    setTextInput(event.target.value);
    handleInputChange(textInput)
  };

  return (
    <div className='text-input'>
      <label className="form-label">
        Prompt:
      </label>
      <input onChange={handleFormChange} type="text" />
    </div>
  );
};

export default TextInput;
