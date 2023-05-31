import React, { useState } from 'react';

const StyleForm = () => {
  const [selectedStyle, setSelectedStyle] = useState('');

  const handleStyleChange = (event) => {
    setSelectedStyle(event.target.value);
  };

  const clearSelection = () => {
    setSelectedStyle('');
  };

  return (
    <form>
      <label htmlFor="style">Select a style:</label>
      <select id="style" value={selectedStyle} onChange={handleStyleChange}>
        <option value="">-- Select --</option>
        <option value="Steampunk">Steampunk</option>
        <option value="Emo">Emo</option>
        <option value="Cyberpunk">Cyberpunk</option>
        <option value="Pop Art">Pop Art</option>
        <option value="Gothic">Gothic</option>
      </select>
      {selectedStyle && (
          <p onClick={clearSelection}>Selected: {selectedStyle}</p>
        )}
    </form>
  );
}

export default StyleForm;