import React, { useState } from 'react';
import Form from '../forms/Form';
import './form-container.css'

const FormContainer = () => {
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
    GPTClientCall(formValues)
    sdClientCall(formValues)
  };

  const handleDropdownChange = (fieldName, selectedValue) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [fieldName]: selectedValue
    }));
  };

  const sdClientCall = (userInput) => {
    fetch('/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInput)
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }

  const GPTClientCall = (userInput) => {
    fetch("/story", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInput)
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }

  return (
    <div className="forms">
    <div className="form-container">
      <h1 className="form-title">Get started with some details...</h1>
      <form onSubmit={handleFormSubmit}>
        <Form
          dropdownItems={character}
          selectionField="Character"
          selectedValue={formValues.character}
          onDropdownChange={(selectedValue) => handleDropdownChange('character', selectedValue)}
        />
        <Form
          dropdownItems={genres}
          selectionField="Genre"
          selectedValue={formValues.genre}
          onDropdownChange={(selectedValue) => handleDropdownChange('genre', selectedValue)}
        />
        <Form
          dropdownItems={style}
          selectionField="Style"
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