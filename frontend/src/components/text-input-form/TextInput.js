import React from "react";
import './TextInput.css'

const TextInput = ({ handleInputChange, textField }) => {
  const handleFormChange = (event) => {
    const inputText = event.target.value;
    handleInputChange(inputText);
  };

  return (
    <div className="text-input">
      <label className="text-input-label">{textField + ":"}</label>
      <textarea className="text-input-input" type="textarea" onChange={handleFormChange} />
    </div>
  );
};

export default TextInput;
