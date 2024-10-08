import React from 'react';
import HomePage from './components/HomePage'; 

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Other Routes */}
      </Routes>
    </Router>
  );
}
export default App;  
