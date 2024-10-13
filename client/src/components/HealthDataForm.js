import React, { useState } from 'react';
import { lipidProfiles, runningMetrics, bodyComposition } from '../services/api';

const databases = [
  { 
    name: 'Lipid Profiles', 
    value: 'lipidProfiles',
    fields: ['total_cholesterol', 'ldl', 'hdl', 'triglycerides']
  },
  { 
    name: 'Running Metrics', 
    value: 'runningMetrics',
    fields: ['distance', 'duration', 'average_heart_rate', 'average_pace']
  },
  { 
    name: 'Body Composition', 
    value: 'bodyComposition',
    fields: ['weight', 'bmi', 'body_fat_percentage']
  }
];

const HealthDataForm = ({ userId }) => {
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');

  const handleDatabaseChange = (e) => {
    setSelectedDatabase(e.target.value);
    setFormData({});
    setMessage('');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      switch (selectedDatabase) {
        case 'lipidProfiles':
          response = await lipidProfiles.create({ ...formData, user_id: userId });
          break;
        case 'runningMetrics':
          response = await runningMetrics.create({ ...formData, user_id: userId });
          break;
        case 'bodyComposition':
          response = await bodyComposition.create({ ...formData, user_id: userId });
          break;
        default:
          throw new Error('Invalid database selected');
      }
      setMessage('Data submitted successfully!');
      setFormData({});
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const renderFields = () => {
    const selectedDbConfig = databases.find(db => db.value === selectedDatabase);
    if (!selectedDbConfig) return null;

    return selectedDbConfig.fields.map(field => (
      <div key={field}>
        <label htmlFor={field}>{field.replace('_', ' ').toUpperCase()}:</label>
        <input
          type="number"
          id={field}
          name={field}
          value={formData[field] || ''}
          onChange={handleInputChange}
          required
        />
      </div>
    ));
  };

  return (
    <div>
      <h2>Submit Health Data</h2>
      <select value={selectedDatabase} onChange={handleDatabaseChange}>
        <option value="">Select a database</option>
        {databases.map(db => (
          <option key={db.value} value={db.value}>{db.name}</option>
        ))}
      </select>

      {selectedDatabase && (
        <form onSubmit={handleSubmit}>
          {renderFields()}
          <button type="submit">Submit</button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default HealthDataForm;