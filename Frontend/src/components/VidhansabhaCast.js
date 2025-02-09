import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function VidhansabhaCast() {
  const [candidates, setCandidates] = useState([]);
  const [voted, setVoted] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem('token'); // Get the token from local storage

  const requestOptions = {
    method: 'GET',
    headers: {
      'token': token // Include the token in the Authorization header
    }
  };

  // Replace 'API_URL' with the actual URL of your API
  fetch('https://matdaan-1.onrender.com/voter/election/VIDHANSABHA', requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch candidates');
      }
      return response.json();
    })
    .then(data => {
      if (data && data.candidates) {
        setCandidates(data.candidates);
      } else {
        console.error('Candidates data is missing from the API response:', data);
      }
    })
    .catch(error => console.error('Error fetching candidates:', error));
}, []);


  // Function to handle candidate selection
  const handleCandidateSelection = candidateId => {
    setSelectedCandidate(candidateId);
  };

  // Function to handle vote submission
  const handleVoteSubmission =  async () => {
    // Replace 'VOTE_API_URL' with the actual URL of your vote submission API
   const response = await  fetch('https://matdaan-1.onrender.com/voter/cast-vote/VIDHANSABHA', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')

      },
      body: JSON.stringify({ candidateId: selectedCandidate })
    })
      // .then(response => response.json())
      // .then(data => {
      //   // Handle successful vote submission
      //   console.log('Vote submitted successfully:', data);
      // })
      // .catch(error => console.error('Error submitting vote:', error));
      const json = await response.json();
      if(json.msg==="success"){
        console.log("You have casted your vote")
        setVoted(true)
        alert("Congrats! You have successfully cast your vote")
        navigate('/voter/home')
      }
      if(json.error=== 'You have already cast your vote for this election'){
        alert("You have already cast your vote for this election ")
        navigate("/voter/home")

      }
  };

  return (
    <>
    
      
      <div className="container">
    <h2>Candidates List for Vidhan Sabha Election</h2>
    <table className="table table-striped table-dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map(candidate => (
          <tr key={candidate._id}>
            <td>{candidate._id}</td>
            <td>{candidate.firstName}</td>
            <td>{candidate.lastName}</td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => handleCandidateSelection(candidate._id)}
                >
                Vote
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {selectedCandidate && (
      <div>
        <h3>Selected Candidate</h3>
        <p>ID: {selectedCandidate}</p>
        <button className="btn btn-success" onClick={handleVoteSubmission}>
          Cast Vote
        </button>
      </div>
    )}
  </div>
 
    </>
  );
}

export default VidhansabhaCast
