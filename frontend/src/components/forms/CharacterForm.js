import React, { useState } from 'react';

const CharacterForm = () => {
  const [selectedCharacter, setSelectedCharacter] = useState('');

  const handleCharacterChange = (event) => {
    setSelectedCharacter(event.target.value);
  };

  const clearSelection = () => {
    setSelectedCharacter('');
  };

  return (
    <form>
      <label htmlFor="character">Select a character:</label>
      <select id="character" value={selectedCharacter} onChange={handleCharacterChange}>
        <option value="">-- Select --</option>
        <option value="Mickey Mouse">Mickey Mouse</option>
        <option value="BugsBunny">Bugs Bunny</option>
        <option value="Pikachu">Pikachu</option>
        <option value="Homer Simpson">Homer Simpson</option>
        <option value="SpongeBob">SpongeBob</option>
        <option value="Rapunzel">Rapunzel</option>
        <option value="Superman">Superman</option>
      </select>
      {selectedCharacter && (
          <p onClick={clearSelection}>Selected: {selectedCharacter}</p>
        )}
    </form>
  );
}

export default CharacterForm;