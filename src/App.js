import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const AlumniList = ({ alumni }) => {
  // ... your component logic for displaying alumni data
};

const DonationStats = ({ stats }) => {
  // ... your component logic for displaying donation statistics
};

const ErrorDisplay = ({ error }) => {
  // ... your component logic for displaying error messages
};

function App() {
  const [alumniData, setAlumniData] = useState(null);
  const [donationStats, setDonationStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const alumniResponse = await api.get('/alumni');
        setAlumniData(alumniResponse.data);

        const statsResponse = await api.get('/donations/stats');
        setDonationStats(statsResponse.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <p>Loading data...</p>
      ) : error ? (
        <ErrorDisplay error={error} />
      ) : (
        <>
          {alumniData && <AlumniList alumni={alumniData} />}
          {donationStats && <DonationStats stats={donationStats} />}
        </>
      )}
    </div>
  );
}

export default App;