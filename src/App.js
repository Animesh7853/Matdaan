import "./App.css";
import UserOption from "./components/useroption";
import Login from "./components/CandidateLogin";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Landing from "./components/Landing";

import Home from "./components/Home";
import VoterLogin from "./components/VoterLogin";
import CandidateLogin from "./components/CandidateLogin";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/candidateLogin" element={<CandidateLogin/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/voterLogin" element={<VoterLogin/>} />

      </Routes>
    </Router>
    // <Modaloption/>
  );
}

export default App;
