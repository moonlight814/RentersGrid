import React, { useState } from 'react';
import OfficialLogo from '../Assets/official logo.svg';
import AccountButton from '../Assets/Account button.svg';
import SubmitLandlordRate from '../Assets/submit landlord rate.svg';
import './SearchResults.css';
import SideMenu from './SideMenu';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Handles search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handles sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
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
      <div className="search-and-sort-container">
        {/* Search Bar Container */}
        <div className="search-bar-container">
          <select className="search-dropdown">
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
            className="search-input"
          />
          <button className="search-button">Search</button>
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
    </div>
  );
}

export default SearchPage;
