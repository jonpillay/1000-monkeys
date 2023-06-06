import React from "react";

const TextInput = ({ handleInputChange, textField }) => {
  const handleFormChange = (event) => {
    const inputText = event.target.value;
    handleInputChange(inputText);
  };

  return (
    <div className="text-input">
      <label className="text-input-label">{textField + ":"}</label>
      <input className="text-input-input" type="text" onChange={handleFormChange} />
    </div>
  );
};

export default TextInput;
