import React, { useState } from 'react';
import SearchBar from './SearchBar';
import TrackList from './TrackList';
import { CSVLink } from 'react-csv';

function App() {
  const [selectedTracks, setSelectedTracks] = useState([]);

  const handleAddTrack = (track) => {
    setSelectedTracks([...selectedTracks, track]);
  };

  const handleRemoveTrack = (trackId) => {
    const updatedTracks = selectedTracks.filter(track => track.id !== trackId);
    setSelectedTracks(updatedTracks);
  };

  const handleClearAllTracks = () => {
    setSelectedTracks([]);
  };

  const handleExportToCSV = () => {
    const csvData = selectedTracks.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artist,
    }));

    const csvHeaders = [
      { label: 'ID', key: 'id' },
      { label: 'Name', key: 'name' },
      { label: 'Artist', key: 'artist' },
    ];

    const csvReport = {
      filename: 'tracks.csv',
      headers: csvHeaders,
      data: csvData,
    };

    // Trigger download using react-csv
    return <CSVLink {...csvReport} />;
  };

  return (
    <div>
      <h1>Amuze Search</h1>
      <SearchBar onAddTrack={handleAddTrack} />
      <TrackList
        tracks={selectedTracks}
        onRemoveTrack={handleRemoveTrack}
        onClearAllTracks={handleClearAllTracks}
        onExportToCSV={handleExportToCSV}
      />
    </div>
  );
}

export default App;