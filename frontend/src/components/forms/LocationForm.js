import React, { useState } from 'react';

const LocationForm = () => {
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const clearSelection = () => {
    setSelectedLocation('');
  };

  return (
    <div>
      <label htmlFor="location">Select a location:</label>
      <select id="location" value={selectedLocation} onChange={handleLocationChange}>
        <option value="">-- Select --</option>
        <option value="Tesco">Tesco</option>
        <option value="Trafalgar Square">Trafalgar Square</option>
        <option value="Brixton">Brixton</option>
        <option value="Camden Town">Camden Town</option>
        <option value="London Underground">London Underground</option>
      </select>
      {selectedLocation && (
        <p onClick={clearSelection}>Selected: {selectedLocation}</p>
      )}
    </div>
  );
};

export default LocationForm;
