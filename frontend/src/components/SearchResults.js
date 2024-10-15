import React, { useState } from 'react';
import OfficialLogo from '../Assets/official logo.svg';
import AccountButton from '../Assets/Account button.svg';
import SubmitLandlordRate from '../Assets/submit landlord rate.svg';
import './SearchResults.css';
import SideMenu from './SideMenu';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('landlord'); // Default to landlord name
  const [sortBy, setSortBy] = useState('');
  const [results, setResults] = useState([]); // State for holding search results
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate();
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  const handleSearch = () => {
    setLoading(true); // Show loading indicator
    fetch(`/api/search?searchBy=${searchType}&query=${encodeURIComponent(searchQuery)}`)
      .then(response => response.json())
      .then(data => {
        console.log('Search results:', data);  // Log the results for debugging
        setResults(data); // Update the results state with the fetched data
        setLoading(false); // Stop loading indicator
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
        setLoading(false); // Stop loading indicator
      });
  };
  return (
    <div className="search-page-container">
      {/* Side Menu Component */}
      <SideMenu />

      {/* Header Section */}
      <header className="header">
        <div className="logo-container">
          <img src={OfficialLogo} alt="Official Logo" className="center-logo" />
        </div>
        <div className="buttons-container">
          {/* Left Button/Icon */}
          <img
            src={SubmitLandlordRate}
            alt="Submit Landlord Rate"
            className="left-icon"
          />
          {/* Right Button/Icon */}
          <img
            src={AccountButton}
            alt="Account Button"
            className="account-right"
          />
        </div>
      </header>

      {/* Search Bar and Sort By Container */}
      <div className="searchby-and-sort-wrapper">
        {/* Search Bar Container */}
        <div className="searchresults-bar-container">
          <select className="searchby-dropdown">
            <option value="landlord">Landlord Name</option>
            <option value="Property">Property Name</option>
            <option value="address">Address</option>
            <option value="City">City</option>
            <option value="zipcode">Zip Code</option>
          </select>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by Location"
            className="searchby-input"
          />
        </div>

        {/* Sort By Dropdown Below the Search Bar */}
        <div className="sort-container">
          <label htmlFor="sort" className="sort-label">Search Results:</label>
          <select
            id="sort"
            className="sort-button"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="">Sort By</option>
            <option value="rating">Highest Rating</option>
            <option value="Landlord name">Landlord Name</option>
            <option value="lowest rating">Lowest Rating</option>
            <option value="property name">Property Name</option>
            <option value="reviews">Most Reviews</option>
          </select>
        </div>
      </div>
      <div className="results-container">
        {loading ? (
          <p>Loading...</p>
        ) : results.length === 0 ? (
          <p>No results found</p>
        ) : (
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                <h3>{result.name || result.landlord_name || 'Unknown Name'}</h3>
                <p>Property: {result.property_name || 'Unknown Property'}</p>
                <p>Address: {result.address || 'Unknown Address'}</p>
                <p>
                  {result.city 
                    ? `${result.city}, ${result.zipcode || ''}` 
                    : 'Location Unknown'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
