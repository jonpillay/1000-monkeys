import React, { useState } from 'react';

const GenreForm = () => {
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const clearSelection = () => {
    setSelectedGenre('');
  };


  return (
    <form>
      <label htmlFor="Genre">Select a Genre:</label>
      <select id="Genre" value={selectedGenre} onChange={handleGenreChange}>
        <option value="">-- Select --</option>
        <option value="Action">Action</option>
        <option value="Horror">Horror</option>
        <option value="SciFi">Sci-Fi</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Fairy Tale">Fairy Tale</option>
        </select>
        {selectedGenre && (
          <p onClick={clearSelection}>Selected: {selectedGenre}</p>
        )}
    </form>
  );
}

export default GenreForm;