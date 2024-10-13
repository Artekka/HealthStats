import React, { useState, useEffect } from 'react';
import { runningMetrics } from '../services/api';

const RunningMetrics = ({ userId }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await runningMetrics.getAll(userId);
        setProfiles(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch running metrics');
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Lipid Profiles</h2>
      {profiles.map((profile) => (
        <div key={profile.id}>
          <p>Date: {new Date(profile.timestamp).toLocaleDateString()}</p>
          <p>Miles Ran: {profile.distance}</p>
          <p>Time Ran: {profile.duration}</p>
          <p>Avg Heart Rate: {profile.average_heart_rate}</p>
          <p>Avg Pace: {profile.average_pace}</p>
        </div>
      ))}
    </div>
  );
};

export default RunningMetrics;