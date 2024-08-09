import React, { useState } from "react";
import Navbar from "./NavBar";

function ElectionResult() {
  const [data, setData] = useState({ city: "", electionType: "" });
  const [candidates, setCandidates] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://matdaan-1.onrender.com/result", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data) // Send the data object as JSON string
      });
      const json = await response.json();
      console.log(json);
      setCandidates(json); // Set the candidates state with the response data
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar home ="/" election="/"/>
      <div className="container">
        <div className="row my-3">
          <div className="col">
            <select
              className="form-select mb-3"
              value={data.electionType}
              name="electionType"
              onChange={onChange}
              aria-label="Default select example"
            >
              <option selected>Select Election-Type...</option>
              <option value="LOKSABHA">Lok Sabha</option>
              <option value="VIDHANSABHA">Vidhan Sabha</option>
              <option value="MUNICIPAL">Municipal Corporation</option>
            </select>
            <div className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </div>
          </div>
          <div className="col">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              placeholder="Enter your city..."
              onChange={onChange}
              name="city"
              value={data.city}
              rows="1"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="container">
        <h2>Candidates List for {data.electionType} Election</h2>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Total No. of Votes</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.candidateId}>
                <td>{candidate.candidateId}</td>
                <td>{candidate.firstName}</td>
                <td>{candidate.lastName}</td>
                <td>{candidate.voteCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ElectionResult;
