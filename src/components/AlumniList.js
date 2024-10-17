import React from 'react';

function AlumniList({ alumni }) {
  return (
    <div>
      <h2>Alumni List</h2>
      {alumni.length > 0 ? (
        <ul>
          {alumni.map((alumni) => (
            <li key={alumni.id}>
              {alumni.name}
              {/* Add more alumni details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No alumni found.</p>
      )}
    </div>
  );
}

export default AlumniList;