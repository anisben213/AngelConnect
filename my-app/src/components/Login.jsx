import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const errors = {};

    if (!email || !email.includes("@")) {
      errors.email = "Invalid email";
    }
    if (!password) {
      errors.password = "Incorrect password";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    try {
      const response = await axios.post("http://localhost:3001/api/login", formData);
      if (response.data) { // Check if there's data in the response
        if (response.data.token) {
          const userType = response.data.userType;
          console.log(userType);
         if(userType==='investor'){
          console.log(userType);
          navigate("/dashboard/investor");
         } else if(userType==='startupper'){
          console.log("Navigating to startupper dashboard");
          console.log(userType);
          navigate("/dashboard/startupper")
        } else  {
          setAlertMessage("unexepected user type");
        }
      } else {
        setAlertMessage("Unexpected response from server. Please try again.");
      }
    }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setAlertMessage(error.response.data.message);
      } else {
        console.error("Error during login:", error);
      }
      setFormData({ email: "", password: "" });
    }
  }

  return (
    <div className="login-body">
      <div className="login-form">
        <h2>Login</h2>
        {alertMessage && <div className="alert">{alertMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Password</label>
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
          <div className="submit-container">
            <button type="submit">Login</button>
          </div>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/signup">Sign-up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
