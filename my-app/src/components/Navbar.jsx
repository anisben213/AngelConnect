import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.2) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`l-navbar ${scroll ? "l-navbar-scrolled" : ""}`}>
      <Link to="hero" smooth={true} duration={500} className="logo">
        AngelConnect
      </Link>
      <ul className="l-nav-links">
        <li>
          <Link to="hero" smooth={true} duration={500} className="l-nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="about" smooth={true} duration={500} className="l-nav-link">
            About Us
          </Link>
        </li>
      </ul>
      <button className="l-login-button" onClick={handleLoginClick}>
        Connexion
      </button>
    </nav>
  );
};

export default Navbar;
