import React from 'react';
import { CSVLink } from 'react-csv';

function TrackList({ tracks, onRemoveTrack, onClearAllTracks, onExportToCSV }) {
  return (
    <div>
      <h2>Selected Tracks</h2>
      <ul>
        {tracks.map(track => (
          <li key={track.id}>
            {track.name} - {track.artist}
            <button onClick={() => onRemoveTrack(track.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={onClearAllTracks}>Clear All</button>
      <button onClick={onExportToCSV}>Export to CSV</button>
      <CSVLink data={tracks} filename={'selected_tracks.csv'}>Download CSV</CSVLink>
    </div>
  );
}

export default TrackList;