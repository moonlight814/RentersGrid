import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import home from '../Assets/home.svg'; // Example icons
import searchIcon from '../Assets/menu-1.svg';
import addLandlordIcon from '../Assets/menu-2.svg';
import signOutIcon from '../Assets/menu-3.svg';
import accountIcon from '../Assets/Account button.svg';
import OfficialLogo from '../Assets/official logo.svg';

//import ratingsIcon from '../Assets/ratings-icon.svg';
//import bookmarksIcon from '../Assets/bookmarks-icon.svg';
import './SideMenu.css'; // Include CSS styles for the side menu

function SideMenu({ onSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu open/close state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Menu button */}
      <div className="menu-button" onClick={toggleMenu}>
        <span className="menu-icon">&#9776;</span>
      </div>

      {/* Side menu */}
      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="close-button" onClick={toggleMenu}>
          &times;
        </div>
        <img src={OfficialLogo} alt="OfficialLogo" className="menu-logo" />
        <ul>
          <li>
            {/* Add navigation using Link for Homepage */}
            <Link to="/" onClick={toggleMenu}>
              <img src={home} alt="Home" className="menu-icon" />
              Homepage
            </Link>
          </li>
          <li>
            {/* Add navigation using Link for Search */}
            <Link to="/SearchResults" onClick={toggleMenu}>
              <img src={searchIcon} alt="Search" className="menu-icon" />
              Search
            </Link>
          </li>
          <li>
            {/* Add navigation using Link for Add a Landlord */}
            <Link to="/add-landlord" onClick={toggleMenu}>
              <img src={addLandlordIcon} alt="Add a Landlord" className="menu-icon" />
              Add a Landlord
            </Link>
          </li>
          <li>
            <a href="#" onClick={() => {
              onSignOut(); // Call the sign-out function passed as a prop
              toggleMenu(); // Close the menu after signing out
            }}>
              <img src={signOutIcon} alt="Sign Out" className="menu-icon" />
              Sign Out
            </a>
          </li>
          <hr />
          <li>
            {/* Add navigation using Link for My Account */}
            <Link to="/account" onClick={toggleMenu}>
              <img src={accountIcon} alt="My Account" className="menu-icon" />
              My Account
            </Link>
          </li>
          <li>
            {/* Add navigation using Link for My Ratings */}
            <Link to="/ratings" onClick={toggleMenu}>
              My Ratings
            </Link>
          </li>
          <li>
            {/* Add navigation using Link for My Bookmarks */}
            <Link to="/bookmarks" onClick={toggleMenu}>
              My Bookmarks
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideMenu;