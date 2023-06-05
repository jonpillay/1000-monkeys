import React, { useState } from 'react';
import Form from '../forms/Form';
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