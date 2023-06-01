import React, { useState } from 'react';
import'./App.css'
import Form from '../formsContainer/Form';

const App = () => {
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
    // Perform actions with the submitted form values
    console.log(formValues);
  };

  return (
    <div className="forms">
      <h1 className="page-title">AI-Tistic Tales</h1>
      <div className="form-container">
      <h1 className="form-title">Get started with some details...</h1>
      <Form dropdownItems={genres} selectionField="Genre" />
      <Form dropdownItems={characters} selectionField="Characters" />
      <Form dropdownItems={locations} selectionField="Locations" />
      <Form dropdownItems={styles} selectionField="Styles" />
      <button type="submit" className="submit-button" onClick={handleFormSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default App;
