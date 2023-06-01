import React, { useState } from 'react';
import Form from '../forms/Form';

const FormContainer = () => {
  const characters = ['Mickey Mouse', 'Bugs Bunny', 'Pikachu', 'Homer Simpson', 'Spongebob', 'Rapunzel', 'Superman'];
  const genres = ['Action', 'Horror', 'Sci-Fi', 'Fantasy', 'Fairy Tale'];
  const locations = ['Tesco', 'Trafalgar Square', 'London Bridge', 'London Underground'];
  const styles = ['Steampunk', 'Emo', 'Cyberpunk', 'Pop Art', 'Gothic'];

  const [formValues, setFormValues] = useState({
    genre: '',
    characters: '',
    locations: '',
    styles: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  const handleDropdownChange = (fieldName, selectedValue) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [fieldName]: selectedValue
    }));
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Get started with some details...</h1>
      <form onSubmit={handleFormSubmit}>
        <Form
          dropdownItems={genres}
          selectionField="Genre"
          selectedValue={formValues.genre}
          onDropdownChange={(selectedValue) => handleDropdownChange('genre', selectedValue)}
        />
        <Form
          dropdownItems={characters}
          selectionField="Characters"
          selectedValue={formValues.characters}
          onDropdownChange={(selectedValue) => handleDropdownChange('characters', selectedValue)}
        />
        <Form
          dropdownItems={locations}
          selectionField="Locations"
          selectedValue={formValues.locations}
          onDropdownChange={(selectedValue) => handleDropdownChange('locations', selectedValue)}
        />
        <Form
          dropdownItems={styles}
          selectionField="Styles"
          selectedValue={formValues.styles}
          onDropdownChange={(selectedValue) => handleDropdownChange('styles', selectedValue)}
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default FormContainer;
