import React, { useState } from 'react';
import axios from 'axios';

function LocationSelector() {
  const [selectedCity, setSelectedCity] = useState('');
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const cities = ['Bhopal', 'Indore', 'Delhi']; // Replace with your city list

  const fetchSuggestions = async (query) => {
    if (!selectedCity || !query) return;
    const apiKey = '30ef0b29005743f0a941ef522552ae6e';

    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
      params: {
        q: `${query} ${selectedCity}`,
        key: apiKey,
        limit: 5,
      },
    });

    const filteredSuggestions = response.data.results.map((result) => result.formatted);
    setSuggestions(filteredSuggestions);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSuggestions([]); // Clear suggestions on city change
  };

  const handleAddressChange = (e) => {
    const query = e.target.value;
    setAddress(query);
    fetchSuggestions(query);
  };

  return (
    <div>
      <select value={selectedCity} onChange={handleCityChange}>
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Enter Address"
      />

      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationSelector;
