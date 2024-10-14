import React from 'react';
<<<<<<< Updated upstream
import HomePage from './components/HomePage'; 
=======
import HomePage from './components/HomePage';
import NoAccountHomepage from './components/NoAccountHomepage'
import SignIn from './components/SignIn';
import SearchResults from './components/SearchResults'
>>>>>>> Stashed changes

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< Updated upstream
        <Route path="/" element={<HomePage />} />
=======
             
              <Route path="/" element={<NoAccountHomepage />} />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/SearchResults" element={<SearchResults />} />
              <Route path="/signin" element={<SignIn />} />
>>>>>>> Stashed changes
        {/* Other Routes */}
      </Routes>
    </Router>
  );
}
export default App;  