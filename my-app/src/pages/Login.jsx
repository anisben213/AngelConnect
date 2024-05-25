import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
      const response = await axios.post(
        "http://localhost:3001/api/login",
        formData
      );
      if (response.data && response.data.token && response.data.userType) {
        console.log("response.data:", response.data);
        const { token, userType,} = response.data;
        let {user} = response.data
        // Store the user informations in localStorage
        let user_serialized= JSON.stringify(user)
        try {
          localStorage.setItem("user",user_serialized );
        } catch (error) {
          console.error("Error storing user in localStorage:", error);
        }

        // Store the token in localStorage
        localStorage.setItem("token", token);

        // Navigate to the appropriate dashboard based on userType
        if (userType === "investor") {
          navigate("/dashboard/investor");
        } else if (userType === "startupper") {
          navigate("/dashboard/startupper");
        } else {
          setAlertMessage("Unexpected user type");
        }
      } else {
        setAlertMessage("Unexpected response from server. Please try again.");
        console.error("Unexpected response from server:", response);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setAlertMessage(error.response.data.message);
      } else {
        setAlertMessage("Error during login. Please try again.");
        console.error("Error during login:", error);
      }
      setFormData({ email: "", password: "" });
    }
  };

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
