import React from 'react';
import HomePage from './components/HomePage';
import NoAccountHomepage from './components/NoAccountHomepage'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
             
              <Route path="/" element={<NoAccountHomepage />} />
              <Route path="/homepage" element={<HomePage />} />
        {/* Other Routes */}
      </Routes>
    </Router>
  );
}
export default App;  
