import React from 'react';
import HealthDataForm from './components/HealthDataForm';

import './App.css';

import LipidProfilesChart from './components/LipidProfilesChart';
import RunningMetricsChart from './components/RunningMetricsChart';
import BodyCompositionChart from './components/BodyCompositionChart';


function App() {
  // get userId from whatever auth solution
  const userId = 1;
  

  return (
    <div className="App">
      <h1>Health Data Dashboard</h1>
      <HealthDataForm userId={userId} />
      <div className="charts-container">
      <LipidProfilesChart userId={userId} />
      <RunningMetricsChart userId={userId} />
        <BodyCompositionChart userId={userId} />
        </div>
    </div>
  );
}

export default App;