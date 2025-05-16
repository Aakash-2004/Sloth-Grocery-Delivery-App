import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/LocationDisplay.css';

const LocationDisplay = () => {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // First try to get the user's location via browser geolocation API
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              
              try {
                // Use reverse geocoding to get the location name
                const response = await axios.get(
                  `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                );
                
                if (response.data) {
                  // Extract city and country from the response
                  const city = response.data.address?.city || 
                              response.data.address?.town || 
                              response.data.address?.village || 
                              response.data.address?.county ||
                              '';
                  
                  const state = response.data.address?.state || '';
                  
                  // Save the location to local storage and state
                  const locationString = city ? (state ? `${city}, ${state}` : city) : 'Your location';
                  localStorage.setItem('userLocation', locationString);
                  setLocation(locationString);
                } else {
                  setLocation('Your location');
                }
                
                setLoading(false);
              } catch (err) {
                console.error('Error fetching location name:', err);
                setLocation('Your location');
                setLoading(false);
              }
            },
            (err) => {
              console.error('Geolocation error:', err);
              setError('Location access denied');
              setLocation('Your location');
              setLoading(false);
            }
          );
        } else {
          // Browser doesn't support geolocation
          setError('Geolocation not supported by your browser');
          setLocation('Your location');
          setLoading(false);
        }
      } catch (err) {
        console.error('Location detection error:', err);
        setLocation('Your location');
        setLoading(false);
      }
    };

    // Check if we already have location in localStorage
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setLocation(savedLocation);
      setLoading(false);
    } else {
      fetchLocation();
    }
  }, []);

  return (
    <div className="location-display">
      {loading ? (
        <span className="location-loading">Detecting location...</span>
      ) : error ? (
        <span className="location-error" title={error}>
          <i className="fas fa-map-marker-alt"></i> Your location
        </span>
      ) : (
        <span className="location-text">
          <i className="fas fa-map-marker-alt"></i> {location}
        </span>
      )}
    </div>
  );
};

export default LocationDisplay; 