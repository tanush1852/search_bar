import React, { useState } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
/*import './SearchBar.css';
import './App.css'*/

const SearchBar = ({ onAddTrack }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const clientID = '48c25271bd9c4f85a0df2a2a97afcf38';
  const clientSecret = 'c3e4909648804bf48e1bffdf9be07c42';

  const authenticateSpotify = async () => {
    const credentials = `${clientID}:${clientSecret}`;
    const base64Credentials = btoa(credentials);

    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${base64Credentials}`
      }
    });

    return response.data.access_token;
  };

  const getSuggestions = async (value) => {
    const accessToken = await authenticateSpotify();

    const response = await axios.get(`https://api.spotify.com/v1/search?q=${value}&type=track`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const tracks = response.data.tracks.items;
    return tracks.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
    }));
  };

  const handleSuggestionsFetchRequested = async ({ value }) => {
    const suggestions = await getSuggestions(value);
    setSuggestions(suggestions);
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const handleSuggestionSelected = (event, { suggestion }) => {
    onAddTrack(suggestion);
    setValue('');
  };

  const inputProps = {
    placeholder: 'Search for a track...',
    value,
    onChange: handleChange,
  };

  return (
    <div className="search-bar-container">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={handleSuggestionsClearRequested}
        getSuggestionValue={suggestion => suggestion.name}
        renderSuggestion={suggestion => (
          <div>
            {suggestion.name} - {suggestion.artist}
          </div>
        )}
        onSuggestionSelected={handleSuggestionSelected}
        inputProps={inputProps}
      />
    </div>
  );
};

export default SearchBar;
