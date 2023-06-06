import React from 'react';
import Select from 'react-select';
import './Form.css';

const Form = ({ dropdownItems, selectionField, selectedValue, onDropdownChange }) => {
  const handleDropdownChange = (selectedOption) => {
    onDropdownChange(selectedOption.value);
  };

  return (
    <div className="form-container">
      <div className="form-label-container">
        <label className="form-label" htmlFor={selectionField}>
          {selectionField}:
        </label>
      </div>
      <div className="custom-select-container">
        <Select
          classNamePrefix="react-select"
          options={dropdownItems.map((item) => ({ value: item, label: item }))}
          value={selectedValue ? { value: selectedValue, label: selectedValue } : null}
          onChange={handleDropdownChange}
          placeholder="Select..."
        />
      </div>
    </div>
  );
};

export default Form;

