import React, { useState } from 'react';
import OfficialLogo from '../Assets/official logo.svg';
import AccountButton from '../Assets/Account button.svg';
import SubmitLandlordRate from '../Assets/submit landlord rate.svg';
import DownArrow from '../Assets/downward.svg'; 
import Map from '../components/Map';
import SideMenu from './SideMenu'; 
import { useNavigate } from 'react-router-dom';
import './HomePage.css';  

const refreshPage = () => {
  window.location.reload();
};

function HomePage() {
  const [selectedOption, setSelectedOption] = useState('landlord');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate(); // Hook to navigate to results page


function HomePage() {

    return (
        <div className="main-container">
            <SideMenu />
  
        <header className="headerhp">
          <div className="logohp-container">
            <img
              src={OfficialLogo}
              alt="Official Logo"
              className="center-logo"
            />
          </div>
          <div className="buttons-container">
          {/* Left Image: Submit Landlord Rate */}

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    setDropdownOpen(false);
  };

  const options = [
    { value: 'landlord', label: 'Landlord Name' },
    { value: 'property', label: 'Property Name' },
    { value: 'address', label: 'Address' },
    { value: 'city', label: 'City' },
    { value: 'zipcode', label: 'Zip Code' },
  ];

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?searchBy=${selectedOption}&value=${searchValue}`);
      const results = await response.json();
      // Navigate to the results page with the fetched results
      navigate('/SearchResults', { state: { results } });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Add a function to handle key presses
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); // Trigger search when Enter key is pressed
    }
  };

  return (
    <div className="main-container">
      <SideMenu />

      <header className="headerhp">
        <div className="logohp-container">
          <img
            src={OfficialLogo}
            alt="Official Logo"
            onClick={refreshPage}
            className="center-logo"
          />
        </div>
        <div className="buttons-container">
          <img src={SubmitLandlordRate} alt="Submit Landlord Rate" className="left-icon" />
          <img src={AccountButton} alt="Account Button" className="account-right" />
        </div>
      </header>

      {/* Search Menu */}
      <div className="search-bar-container">
        <div className="dropdown-container">
          <div className="dropdown-selected" onClick={handleDropdownToggle}>
            <span>{options.find(option => option.value === selectedOption)?.label}</span>
            <img
              src={DownArrow}
              alt="Down Arrow"
              className={`down-arrow ${dropdownOpen ? 'open' : ''}`} 
            />
          </div>

          {dropdownOpen && (
            <ul className="dropdown-options">
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`dropdown-item ${selectedOption === option.value ? 'selected' : ''}`}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
  type="text"
  placeholder={`Search by ${options.find(option => option.value === selectedOption)?.label}`} 
  className="search-input"
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
  onKeyDown={handleKeyPress} // Change to onKeyDown
/>

      </div>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <Map />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
