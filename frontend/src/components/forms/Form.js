import React from 'react';

const Form = ({ dropdownItems, selectionField, selectedValue, onDropdownChange }) => {
  const handleDropdownChange = (event) => {
    onDropdownChange(event.target.value);
  };

  return (
    <div className="form">
      <label htmlFor={selectionField}>{selectionField}:</label>
      <select id={selectionField} value={selectedValue} onChange={handleDropdownChange}>
        <option value="">-- Select --</option>
        {dropdownItems.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Form;
