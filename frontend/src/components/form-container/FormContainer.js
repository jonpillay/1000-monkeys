import React, { useEffect, useState } from 'react';
import Form from '../forms/Form';
import TextInput from '../text-input-form/TextInput';
import './form-container.css'

const FormContainer = ({ navigate }) => {
  const character = ['Mickey Mouse', 'Bugs Bunny', 'Pikachu', 'Homer Simpson', 'Spongebob', 'Rapunzel', 'Superman'];
  const genre = ['dystopia', 'fairytale'];
  const style = ['cartoon', 'photorealistic'];

  const [formValues, setFormValues] = useState({
    character: '',
    genre: '',
    style: '',
    prompt: '',
    messageHistory: []
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem('userChoices');
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

  useEffect(() => {
  }, [formValues]);

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
            dropdownItems={genre}
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
          <TextInput handleInputChange={handleInputChange}/>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FormContainer;