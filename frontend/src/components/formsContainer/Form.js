import './Form.css'; 
import React, { useState } from 'react';

const Form = ({ dropdownItems, selectionField }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const clearSelection = () => {
    setSelectedValue('');
  };

  return (
    <div className="form-container">
      <form className="form">
        <label htmlFor={selectionField}>Select {selectionField}:</label>
        <select id={selectionField} value={selectedValue} onChange={handleDropdownChange}>
          <option value="">-- Select --</option>
          {dropdownItems.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {selectedValue && (
          <p onClick={clearSelection}>Selected: {selectedValue}</p>
        )}
      </form>
    </div>
  );
};

export default Form;
