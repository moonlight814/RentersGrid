import React, { useState } from 'react';
import MapComponent from "../components/MapComponent"; // Import the MapComponent

import OfficialLogo from '../Assets/official logo.svg';
import AccountButton from '../Assets/Account button.svg';
import SubmitLandlordRate from '../Assets/submit landlord rate.svg';

import SideMenu from './SideMenu'; // Import the SideMenu component

import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file for styling if needed

function HomePage() {
  return (
    <div className="main-container">
      {/* Side Menu */}
      <SideMenu />

      {/* Header Section */}
      <header className="headerhp">
        <div className="logohp-container">
          <img src={OfficialLogo} alt="Official Logo" className="center-logo" />
        </div>
        
      </header>
      <div className="buttons-container">
          {/* Left Image: Submit Landlord Rate */}
          <img src={SubmitLandlordRate} alt="Submit Landlord Rate" className="left-icon" />

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
