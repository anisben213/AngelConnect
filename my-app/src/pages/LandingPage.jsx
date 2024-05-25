import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import "aos/dist/aos.css";
import AOS from "aos";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate()

  const handleStartupperCta = ()=> {
    navigate('/signup/startupper')
  }
  const handleInvestorCta = () => {
    navigate('/signup/investor')
  }
  const handleSignupCta = () => {
    navigate('/signup')
  }
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="landing-page">
      <Navbar />
      <section className="hero">
        <h1>Welcome to AngelConnect</h1>
        <p>Connecting Investors and Startuppers</p>
        <div className="cta-buttons">
          <button className="cta-button investor" onClick={handleInvestorCta}>Investor</button>
          <button className="cta-button startupper" onClick={handleStartupperCta}>Startupper</button>
        </div>
      </section>
      <section className="about">
        <h2 className="about-title">About Us</h2>
        <div className="about-items">
          <div className="about-item" data-aos="fade-up">
            <img src="hero-1.avif" alt="Our Mission" />
            <h3>Our Mission</h3>
            <p>
              Our mission is to connect startups with investors to foster
              innovation and growth.
            </p>
          </div>
          <div className="about-item" data-aos="fade-up">
            <img src="Hero-Section.jpg" alt="Founding Story" />
            <h3>Founding History</h3>
            <p>
              Founded by entrepreneurs, for entrepreneurs, AngelConnect bridges
              the gap between vision and funding.
            </p>
          </div>
        </div>
        <div className="about-cta">
          <button className="signup" onClick={handleSignupCta}>Sign Up</button>
        </div>
      </section>
      <section className="stats-section">
        <div className="stats">
          <h2>Our Impact</h2>
          <div className="stats-container">
            <div className="stat" data-aos="fade-up">
              <h3>+1M DZD</h3>
              <h4>Money Invested</h4>
              <p>since our platform is on work on the web.</p>
            </div>
            <div className="stat" data-aos="fade-up" data-aos-delay="200">
              <h3>500+</h3>
              <h4>Startups Connected</h4>
              <p>many startups found their financment with AngelConnect</p>
            </div>
            <div className="stat" data-aos="fade-up" data-aos-delay="400">
              <h3>24/7</h3>
              <h4>Support</h4>
              <p>
                don't hesitate to contact us at anytime , our team work for you
                24/7.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: contact@angelconnect.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h3>FAQ</h3>
            <p><a href="#faq1">What is AngelConnect?</a></p>
            <p><a href="#faq2">How do I join?</a></p>
            <p><a href="#faq3">What services do you offer?</a></p>
          </div>
        </div>
        <div className="footer-copyright">
          <p>&copy; 2024 AngelConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
