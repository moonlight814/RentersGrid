import React, { useState } from 'react';
import './SideMenu.css'; // Include CSS styles for the side menu

function SideMenu() {
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
        <img src={require('../Assets/official logo.svg').default} alt="Logo" className="menu-logo" />
        <ul>
          <li>Homepage</li>
          <li>Search</li>
          <li>Add a Landlord</li>
          <li>Sign Out</li>
          <hr />
          <li>My Account</li>
          <li>My Ratings</li>
          <li>My Bookmarks</li>
        </ul>
      </div>
    </div>
  );
}

export default SideMenu;
