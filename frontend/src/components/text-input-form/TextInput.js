import React from 'react';

const TextInput = ({ handleInputChange }) => {
  const handleFormChange = (event) => {
    const inputText = event.target.value;
    handleInputChange(inputText);
    };

  return (
    <div className='text-input'>
      <label className="form-label">
        Prompt:
      </label>
      <input type="text" onChange={handleFormChange} />
    </div>
  );
};

export default TextInput;