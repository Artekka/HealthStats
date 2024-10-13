import React, { useState, useEffect } from 'react';
import { bodyComposition } from '../services/api';

const BodyComposition = ({ userId }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await bodyComposition.getAll(userId);
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
      <h2>Body Composition</h2>
      {profiles.map((profile) => (
        <div key={profile.id}>
          <p>Date: {new Date(profile.timestamp).toLocaleDateString()}</p>
          <p>Body Weight: {profile.weight}</p>
          <p>BMI: {profile.bmi}</p>
          <p>Body Fat %: {profile.body_fat_percentage}</p>
        </div>
      ))}
    </div>
  );
};

export default BodyComposition;