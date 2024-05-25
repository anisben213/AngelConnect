import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DashNav.css"; // Import the CSS file for the Navbar

const DashNav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.firstName) {
      setFirstName(user.firstName);
    }  else {
        navigate("/login");
    }
  }, [navigate]); 

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="dash-navbar">
      <div className="dash-logo">AngelConnect</div>
      <div className="profile-container" onClick={toggleDropdown}>
        <div className="profile-icon">{(firstName.charAt(0)).toUpperCase()}</div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={handleProfile}>Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DashNav;
