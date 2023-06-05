import React from "react";

const TextInput = ({ handleInputChange, textField }) => {
  const handleFormChange = (event) => {
    const inputText = event.target.value;
    handleInputChange(inputText);
  };

  return (
    <div className="text-input">
      <label className="form-label">{textField + ":"}</label>
      <input type="text" onChange={handleFormChange} />
    </div>
  );
};

export default TextInput;
