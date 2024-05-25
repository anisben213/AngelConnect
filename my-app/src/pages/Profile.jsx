import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import {jwtDecode} from "jwt-decode"; 
import  {useNavigate} from 'react-router-dom'

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password:""
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType,setAlertType]=useState("")
  const [userId, setUserId] = useState(null); 
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    // Fetch current user information 
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate('/login')
          return;
        }

        console.log(user);
        const decodedToken = jwtDecode(token);

        const userIdFromToken = decodedToken._id;
        setUserId(userIdFromToken);

        setFormData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3001/api/user/profile/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlertMessage("Profile updated successfully!");
      setAlertType("success");

      setTimeout(() => {
        navigate(user.userType === 'startupper' ? '/dashboard/startupper' : '/dashboard/investor');
      }, 800);
    } catch (error) {
      console.error("Error updating profile:", error);
      setAlertMessage("Failed to update profile. Please try again.");
      setAlertType("error")
    }
  };

  return (
    <div className="p-profile-container">
      <h2>Update Profile</h2>
      {alertMessage && <div className={`alert ${alertType}`}>{alertMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            placeholder="enter password"
            onChange={handleChange}
          />
        </div>
        <button className="up-button" type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
