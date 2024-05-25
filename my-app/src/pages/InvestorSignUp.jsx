import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./InvestorSignUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faPhone,
  faBuilding,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const InvestorSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    company: "",
  });
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form data validation
    const { firstName, lastName, email, password, phone, company } =
      formData;
    const errors = {};
    if (!firstName) {
      errors.firstName = "First name is required";
    }
    if (!lastName) {
      errors.lastName = "Last name is required";
    }
    if (!email || !email.includes("@")) {
      errors.email = "Invalid email";
    }
    if (!password || password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!phone) {
      errors.phone = "Phone number is required";
    }
    if (!company) {
      errors.company = "Company name is required";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Sending data to the backend
    try {
      await axios.post(
        "http://localhost:3001/api/register/investor",
        formData
      );
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setAlertMessage(error.response.data.message);
      } else {
        console.error("Error during signup:", error);
      }
    }
  };

  return (
    <div className="investor-signup-body">
    <div className="investor-signup-form">
      <h2>Sign Up</h2>
      {alertMessage && <div className="alert">{alertMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="investor-form-container">
          <div className="form-child">
            <div className="form-group">
              <label htmlFor="firstName">
                <FontAwesomeIcon icon={faUser} /> First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">
                <FontAwesomeIcon icon={faUser} /> Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} /> Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">
                <FontAwesomeIcon icon={faLock} /> Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
          </div>
          <div className="form-child">
            <div className="form-group">
              <label htmlFor="phone">
                <FontAwesomeIcon icon={faPhone} /> Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="company">
                <FontAwesomeIcon icon={faBuilding} /> Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
              />
              {errors.company && (
                <span className="error">{errors.company}</span>
              )}
            </div>
            <div className="submit-container">
              <button type="submit">
              Sign Up <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft:"8px" }} />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default InvestorSignUp;
