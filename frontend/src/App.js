import React from 'react';
import HomePage from './components/HomePage'; 
import SearchPage from './components/SearchResults';  // Import SearchPage
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SearchResults" element={<SearchPage />} /> {/* Add SearchPage route */}
        {/* Other Routes */}
      </Routes>
    </Router>
  );
}

export default App;
