import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./StartupperDash.css";
import { useNavigate } from "react-router-dom";
import DashNav from "../components/DashNav";
import Contact from "../components/Contact"

const StartupperDash = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null)
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const fetchInvestors = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
      }
      const response = await axios.get(
        `http://localhost:3001/api/user/startupper/dashboard?page=${currentPage}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      setUsers(response.data);
      const totalPages = parseInt(response.headers["x-total-pages"], 10);
      if (!isNaN(totalPages)) {
        setTotalPages(totalPages);
      } else {
        console.error(
          "Invalid total pages count:",
          response.headers["x-total-pages"]
        );
      }
    } catch (error) {
      console.error("Error fetching investors:", error);
    }
  }, [currentPage,navigate]);

  useEffect(() => {
    fetchInvestors();
  }, [currentPage,fetchInvestors]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleContactClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseContact = () => {
    setSelectedUser(null);
  };



  return (
    <div className="Dash">
      <DashNav/>
    <div className="container">

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Company</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.company}</td>
              <td><button className="contact-button" onClick={()=>handleContactClick(user)}>Contact</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      {selectedUser && (
          <Contact user={selectedUser} onClose={handleCloseContact} />
        )}
    </div>
    </div>
  );
};

export default StartupperDash;
