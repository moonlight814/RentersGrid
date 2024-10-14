import React, { useState } from 'react';
import MapComponent from "../components/MapComponent"; // Import the MapComponent

import OfficialLogo from '../Assets/official logo.svg';
import AccountButton from '../Assets/Account button.svg';
import SubmitLandlordRate from '../Assets/submit landlord rate.svg';
<<<<<<< Updated upstream

=======
import Map from '../components/Map';
>>>>>>> Stashed changes
import SideMenu from './SideMenu'; // Import the SideMenu component
import { useNavigate } from 'react-router-dom';
<<<<<<< Updated upstream
import './HomePage.css'; // Import the CSS file for styling if needed

function HomePage() {
  return (
    <div className="main-container">
      {/* Side Menu */}
      <SideMenu />
=======
import './HomePage.css';  // Create a CSS file for styling if needed

/*const HomePage = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search-results?searchBy=${searchType}&query=${searchInput}`);
  };*/

function HomePage() {
    const [selectedOption, setSelectedOption] = useState('landlord'); // Default option
    const [dropdownOpen, setDropdownOpen] = useState(false); // To toggle the dropdown
    const [isSignedIn, setIsSignedIn] = useState(true); //track if user is signed in
    const navigate = useNavigate(); 

    // Function to refresh the page
    const refreshPage = () => {
        window.location.reload();
    };

    //function to handle sign out
    const handleSignOut = () => {
        setIsSignedIn(false); //reset sign in state
        //redirect to the homepage or sign-in page
        navigate('/'); //route to no account homepage
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleOptionSelect = (value) => {
        setSelectedOption(value);
        setDropdownOpen(false); // Close the dropdown after selection
    };

    const options = [
        { value: 'landlord', label: 'Landlord Name' },
        { value: 'property', label: 'Property Name' },
        { value: 'address', label: 'Address' },
        { value: 'city', label: 'City' },
        { value: 'zipcode', label: 'Zip Code' },
    ];

    return (
        <div className="main-container">
            <SideMenu onSignOut={handleSignOut} /> {/* Pass handleSignOut as a prop */}

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
                    {/* Left Image: Submit Landlord Rate */}
                    <img
                        src={SubmitLandlordRate}
                        alt="Submit Landlord Rate"
                        className="left-icon"
                    />

                    {/* Right Image: Account Button */}
                    <img
                        src={AccountButton}
                        alt="Account Button"
                        className="account-right"
                    />
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
                            className={`down-arrow ${dropdownOpen ? 'open' : ''}`} // Add a class to rotate the arrow when open
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
                    placeholder={`Search by ${options.find(option => option.value === selectedOption)?.label}`} // Dynamic placeholder
                    className="search-input"
                />
            </div>

            <section className="map-section">
                <div className="map-container">
                    <Map />
                </div>
            </section>
>>>>>>> Stashed changes

      {/* Header Section */}
      <header className="headerhp">
        <div className="logohp-container">
          <img src={OfficialLogo} alt="Official Logo" className="center-logo" />
        </div>
        
<<<<<<< Updated upstream
      </header>
      <div className="buttons-container">
          {/* Left Image: Submit Landlord Rate */}
          <img src={SubmitLandlordRate} alt="Submit Landlord Rate" className="left-icon" />
=======
       );
    }
>>>>>>> Stashed changes

          {/* Right Image: Account Button */}
          <img src={AccountButton} alt="Account Button" className="account-right" />
        </div>
      {/* Search Bar Container */}
      <div className="search-bar-container">
        <select className="search-dropdown">
          <option value="landlord">Landlord Name</option>
          <option value="Property">Property Name</option>
          <option value="address">Address</option>
          <option value="City">City</option>
          <option value="zipcode">Zip Code</option>
        </select>
        <input type="text" placeholder="Search by Location" className="search-input" />
        <button className="search-button">Search</button>
      </div>

      {/* Map Section */}
      <section
        className="map-section"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "80vh",
          margin: "20px 0", // Adds some spacing to separate from other elements
        }}
      >
        {/* Map Container */}
        <div style={{ width: "90%", height: "80%" }}>
          <MapComponent />
        </div>
      </section>
    </div>
  );
}

export default HomePage;