import React, { useState, useEffect } from 'react';
import './Navbar.css';
import {Link} from 'react-scroll'

const Navbar = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.2) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scroll ? 'navbar-scrolled' : ''}`}>
      <Link to="hero" smooth={true} duration={500} className="logo">
            AngelConnect
          </Link>
      <ul className="nav-links">
        <li>
          <Link to="hero" smooth={true} duration={500} className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="about" smooth={true} duration={500} className="nav-link">
            About Us
          </Link>
        </li>
      </ul>
      <button className="login-button">Connexion</button>
    </nav>
  );
};

export default Navbar;
