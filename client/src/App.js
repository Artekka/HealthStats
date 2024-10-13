import './App.css';

import React from 'react';
import LipidProfiles from './components/LipidProfiles';
import RunningMetrics from './components/RunningMetrics';
import BodyComposition from './components/BodyComposition';
import HealthDataForm from './components/HealthDataForm';

function App() {
  // In a real app, you'd get the userId from authentication
  const userId = 1;

  return (
    <div className="App">
      <h1>Health Data Dashboard</h1>
      <LipidProfiles userId={userId} />
      <RunningMetrics userId={userId} />
      <BodyComposition userId={userId} />
      <HealthDataForm userId={userId} />
    </div>
  );
}

export default App;