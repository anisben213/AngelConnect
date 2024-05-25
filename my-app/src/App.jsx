import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SelectUserTypePage from "./pages/SelectUserTypePage";
import InvestorSignUp from "./pages/InvestorSignUp";
import StartupperSignUp from "./pages/StartupperSignUp";
import Login from "./pages/Login";
import InvestorDash from "./pages/InvestorDash";
import StartupperDash from "./pages/StartupperDash";
import Profile from "./pages/Profile"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LandingPage/>} />
        <Route path="/signup" element={<SelectUserTypePage/>} />
        <Route path="/signup/investor" element={<InvestorSignUp/>} />
        <Route path="/signup/startupper" element={<StartupperSignUp/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard/investor' element={<InvestorDash/>}/>
        <Route path='/dashboard/startupper' element={<StartupperDash/>}/>
        <Route path='/profile' element ={<Profile/>}/>
      </Routes>
    </Router>
  );
};

export default App;
