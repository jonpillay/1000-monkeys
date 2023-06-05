import React, { useState } from 'react';
import Form from '../forms/Form';
import TextInput from '../text-input-form/TextInput';
import './form-container.css'

const FormContainer = ({ navigate }) => {
  const character = ['Mickey Mouse', 'Bugs Bunny', 'Pikachu', 'Homer Simpson', 'Spongebob', 'Rapunzel', 'Superman'];
  const genres = ['dystopia', 'fairytale'];
  const location = ['Tesco', 'Trafalgar Square', 'London Bridge', 'London Underground'];
  const style = ['cartoon', 'photorealistic'];

  const [formValues, setFormValues] = useState({
    genre: '',
    // character: '',
    // location: '',
    style: '',
    prompt: ''
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

  const handleInputChange = (inputText) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      prompt: inputText
    }));
  }

  return (
    <div className="forms">
    <div className="form-container">
      <h1 className="form-title">Get started with some details...</h1>
      <form onSubmit={handleFormSubmit}>
        <Form
          dropdownItems={genres}
          selectionField="Genre"
          selectedValue={formValues.genre}
          onDropdownChange={(selectedValue) => handleDropdownChange('genre', selectedValue)}
        />
        {/* <Form
          dropdownItems={character}
          selectionField="character"
          selectedValue={formValues.character}
          onDropdownChange={(selectedValue) => handleDropdownChange('character', selectedValue)}
        />
        <Form
          dropdownItems={location}
          selectionField="location"
          selectedValue={formValues.location}
          onDropdownChange={(selectedValue) => handleDropdownChange('location', selectedValue)}
        /> */}
        <Form
          dropdownItems={style}
          selectionField="Style"
          selectedValue={formValues.style}
          onDropdownChange={(selectedValue) => handleDropdownChange('style', selectedValue)}
        />
        <TextInput handleInputChange={handleInputChange}/>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default FormContainer;