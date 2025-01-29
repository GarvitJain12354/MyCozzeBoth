import React, { useState } from 'react';
import axios from 'axios';

const PlaceSearch = () => {
  const [city, setCity] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = '30ef0b29005743f0a941ef522552ae6e';

  // Step 1: Get the latitude and longitude of the city
  const fetchCityCoordinates = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${apiKey}&countrycode=IN`
      );
      const { lat, lng } = response.data.results[0].geometry;
      setCoordinates({ lat, lng });
      fetchFamousAreas(lat, lng); // Call the next function to get famous areas
    } catch (err) {
      setError('Failed to fetch city coordinates. Please try again.');
      setLoading(false);
    }
  };

  // Step 2: Use coordinates to find famous areas within a radius
  const fetchFamousAreas = async (latitude, longitude) => {
    try {
      const radius = 1000000; // Radius in meters (10 km)
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&radius=${radius}&key=${apiKey}`
      );
      const places = response.data.results.map(result => result.formatted);
      setAreas(places);
    } catch (err) {
      setError('Failed to fetch famous areas. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city) fetchCityCoordinates();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Find Famous Areas in an Indian City</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        style={{ padding: '10px', width: '200px', marginRight: '10px' }}
      />
      <button onClick={handleSearch} style={{ padding: '10px' }} disabled={loading}>
        {loading ? 'Loading...' : 'Search'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {areas.length > 0 && (
        <div>
          <h3>Famous Areas in {city}:</h3>
          <ul>
            {areas.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlaceSearch;
