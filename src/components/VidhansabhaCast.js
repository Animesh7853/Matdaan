import React, { useState, useEffect } from 'react';

function VidhansabhaCast() {
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
  
    // Fetch candidates from the API
    useEffect(() => {
      // Replace 'API_URL' with the actual URL of your API
      fetch('API_URL')
        .then(response => response.json())
        .then(data => setCandidates(data))
        .catch(error => console.error('Error fetching candidates:', error));
    }, []);
  
    // Function to handle candidate selection
    const handleCandidateSelection = candidateId => {
      setSelectedCandidate(candidateId);
    };
  
    // Function to handle vote submission
    const handleVoteSubmission = () => {
      // Replace 'VOTE_API_URL' with the actual URL of your vote submission API
      fetch('VOTE_API_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ candidateId: selectedCandidate })
      })
        .then(response => response.json())
        .then(data => {
          // Handle successful vote submission
          console.log('Vote submitted successfully:', data);
        })
        .catch(error => console.error('Error submitting vote:', error));
    };
  
    return (
      <div className="container">
        <h2>Candidates List</h2>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Party</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map(candidate => (
              <tr key={candidate.id}>
                <td>{candidate.id}</td>
                <td>{candidate.name}</td>
                <td>{candidate.party}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleCandidateSelection(candidate.id)}
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
    );
}

export default VidhansabhaCast
