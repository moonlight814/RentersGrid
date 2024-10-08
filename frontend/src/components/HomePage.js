import React, { useState } from 'react';
import OfficialLogo from '../Assets/official logo.svg';
import AccountButton from '../Assets/Account button.svg';
import SubmitLandlordRate  from '../Assets/submit landlord rate.svg';


import SideMenu from './SideMenu'; // Import the SideMenu component

import { useNavigate } from 'react-router-dom';
import './HomePage.css';  // Create a CSS file for styling if needed

/*const HomePage = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search-results?searchBy=${searchType}&query=${searchInput}`);
  };*/
  

function HomePage() {
    const initMap = () => {
        const map = new window.google.maps.Map(document.getElementById("map"),
            {
                zoom: 8,
                center: { lat: 40.712776, lng: -74.005974 }
            });

        properties.forEach((property) => {
            const marker = new window.google.maps.Marker({
                position: { lat: property.latitude, lng: property.longitude },
                map,
                title: property.name,

            });
        });
    };
    return (
        <div className="main-container">
            <SideMenu />
            <h1>LandlordP Properties</h1>
            <div id="map" style={{ height: '400px', width: '100%' }}></div>
            {/* Loadd the Google Maps Javascript API */}
            <script
                src={`https://maps.googleapis.com/maps/api/js?key= AIzaSyC_szfIV0fxMt05xhWEgJtgbyd1BnBZrhk = initmap`}
                async
                defer
            ></script>
  
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
        <select className="search-dropdown">
          <option value="landlord">Landlord Name</option>
          <option value="Property">Property Name</option>
          <option value="address">Address</option>
          <option value="City">City</option>
          <option value="zipcode">Zip Code</option>

        </select>
        <input
          type="text"
          placeholder="Search by Location"
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>
    </div>
  );
}
  
  export default HomePage;