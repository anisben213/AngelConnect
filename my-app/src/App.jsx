import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SelectUserTypePage from "./components/SelectUserTypePage";
import InvestorSignUp from "./components/InvestorSignUp";
import StartupperSignUp from "./components/StartupperSignUp";
import Login from "./components/Login";
import InvestorDash from "./components/InvestorDash";
import StartupperDash from "./components/StartupperDash";

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
      </Routes>
    </Router>
  );
};

export default App;
