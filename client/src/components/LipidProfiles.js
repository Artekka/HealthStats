import React, { useState, useEffect } from 'react';
import { lipidProfiles } from '../services/api';

const LipidProfiles = ({ userId }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await lipidProfiles.getAll(userId);
        setProfiles(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch lipid profiles');
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
          <p>Total Cholesterol: {profile.total_cholesterol}</p>
          <p>LDL: {profile.ldl}</p>
          <p>HDL: {profile.hdl}</p>
          <p>Triglycerides: {profile.triglycerides}</p>
        </div>
      ))}
    </div>
  );
};

export default LipidProfiles;