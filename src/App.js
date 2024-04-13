import CandidateSignUp from "./components/CandidateSignup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Landing from "./components/Landing";
import CandidateHome from "./components/CandidateHome";
import VoterLogin from "./components/VoterLogin";
import CandidateLogin from "./components/CandidateLogin";
import VoterSignup from "./components/VoterSignup";
import VoterHome from "./components/VoterHome";
import VoterAddress from "./components/VoterAddress";
import VoterElection from "./components/VoterElection";
import ElectionResult from "./components/ElectionResult";
import VoteCast from "./components/VoteCast";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/candidate/Login" element={<CandidateLogin/>} />
        <Route exact path="/candidate/home" element={<CandidateHome/>} />
        <Route exact path="/candidate/signup" element={<CandidateSignUp/>} />
        <Route exact path="/voter/login" element={<VoterLogin/>} />
        <Route exact path="/voter/signup" element={<VoterSignup/>} />
        <Route exact path="/voter/home" element={<VoterHome/>} />
        <Route exact path="/voter/address" element={<VoterAddress/>} />
        <Route exact path="/voter/election" element={<VoterElection/>} />
        <Route exact path="/election/result" element={<ElectionResult/>} />
        <Route exact path="/voter/cast-vote" element={<VoteCast/>} />







      </Routes>
    </Router>
    // <Modaloption/>
  );
}

export default App;
