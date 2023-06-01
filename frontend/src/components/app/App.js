import React from 'react';
import'./App.css'
import Form from '../formsContainer/Form';

const App = () => {
  const characters = ['Mickey Mouse', 'Bugs Bunny', 'Pikachu', 'Homer Simpson', 'Spongebob', 'Rapunzel', 'Superman'];
  const genres = ['Action', 'Horror', 'Sci-Fi', 'Fantasy', 'Fairy Tale'];
  const locations = ['Tesco', 'Trafalgar Square', 'London Bridge', 'London Underground'];
  const styles = ['Steampunk', 'Emo', 'Cyberpunk', 'Pop Art', 'Gothic'];

  return (
    <div className="forms">
      <Form dropdownItems={genres} selectionField="Genre" />
      <Form dropdownItems={characters} selectionField="Characters" />
      <Form dropdownItems={locations} selectionField="Locations" />
      <Form dropdownItems={styles} selectionField="Styles" />
    </div>
  );
};

export default App;
