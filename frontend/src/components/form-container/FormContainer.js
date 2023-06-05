import React, { useState } from 'react';
import Form from '../forms/Form';
import './form-container.css'

const FormContainer = ({ navigate }) => {
  const character = ['Spiderman', 'Rapunzel', 'Darth Vader', 'Wonder Woman', 'Batman', 'Hermione Granger'];
  const genres = ['Dystopia', 'Fairytale'];
  const style = ['Cartoon', 'Realistic'];

  const [formValues, setFormValues] = useState({
    character: '',
    genre: '',
    style: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userChoices', JSON.stringify(formValues));
    navigate('/results')
  };

  const handleDropdownChange = (fieldName, selectedValue) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [fieldName]: selectedValue
    }));
  };

  return (
    <div className="formcontainer">
      <h2 className="sub-title">Welcome to AI-tistic Tales</h2>
      <div className="formcontainer-container">
        <h1 className="formcontainer-title">Get started with some details...</h1>
        <form onSubmit={handleFormSubmit}>
          <Form
            dropdownItems={character}
            selectionField="Character"
            selectedValue={formValues.character}
            onDropdownChange={(selectedValue) => handleDropdownChange('character', selectedValue)}
          />
          <Form
            dropdownItems={genres}
            selectionField="Writing Style"
            selectedValue={formValues.genre}
            onDropdownChange={(selectedValue) => handleDropdownChange('genre', selectedValue)}
          />
          <Form
            dropdownItems={style}
            selectionField="Artistic Style"
            selectedValue={formValues.style}
            onDropdownChange={(selectedValue) => handleDropdownChange('style', selectedValue)}
          />
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FormContainer;