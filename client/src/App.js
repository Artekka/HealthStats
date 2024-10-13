import './App.css';

import React from 'react';
import LipidProfilesChart from './components/LipidProfilesChart';
import RunningMetricsChart from './components/RunningMetricsChart';
import BodyCompositionChart from './components/BodyCompositionChart';
import HealthDataForm from './components/HealthDataForm';

function App() {
  // In a real app, you'd get the userId from authentication
  const userId = 1;

  return (
    <div className="App">
      <h1>Health Data Dashboard</h1>
      <LipidProfilesChart userId={userId} />
      <RunningMetricsChart userId={userId} />
      <BodyCompositionChart userId={userId} />
      <HealthDataForm userId={userId} />
    </div>
  );
}

export default App;