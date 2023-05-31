import CharacterForm from '../forms/CharacterForm.js'
import StyleForm from '../forms/StyleForm.js'
import GenreForm from '../forms/GenreForm.js'
import LocationForm from '../forms/LocationForm.js'
import "./FormsContainer.css";

const FormsContainer = () => {
  return (
    <div className="forms-container">
      <h2>Select a few details to get started</h2>
      <CharacterForm />
      <StyleForm />
      <GenreForm />
      <LocationForm />
      <button>Create Your Story!</button>
    </div>
  );
};

export default FormsContainer;
