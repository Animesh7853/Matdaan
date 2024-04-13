import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './landing.css'

export default function Landing() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleValue = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = () => {
    console.log(selectedValue);
    if (selectedValue === 'voter') {
      navigate('../voter/Login');
    } else if (selectedValue === 'candidate') {
      navigate('../candidate/Login');
    } else {
      alert('Choose your identity');
    }
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      // Close the modal when navigating away from the landing page
      setShowModal(false);
    };

    // Listen for route changes
    window.addEventListener("popstate", handleRouteChange);

    // Cleanup function
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return (
    <>
      <div className="container-fluid vh-100 position-relative overflow-hidden p-0">
        <video autoPlay muted loop className="video-background position-absolute top-0 left-0 w-100 h-100 m-0 p-0">
          <source src={require("../components/bg.mp4")} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="d-flex justify-content-center align-items-center text-center position-absolute top-0 start-0 w-100 h-100">
          <div>
            <h1 className="text" style={{ color: 'rgb(242, 242, 242)' }}>🗳️ Welcome to Matdaan! 📮</h1>
            <h2 className="text" style={{ color: 'rgb(191, 191, 191)' }}>
              Cast your vote and be a part of shaping the future!
            </h2>
            <span className="border-left">
              <button
                type="button"
                className="btn btn-dark btn-lg"
                onClick={() => setShowModal(true)}
              >
                Get Started
              </button>
            </span>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show custom-modal" // added custom-modal class
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content custom-modal-content"> {/* added custom-modal-content class */}
              <div className="modal-header">
                <h5 className="modal-title">Who you are?</h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={handleCloseModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <select
                  className="form-select"
                  value={selectedValue}
                  onChange={handleValue}
                >
                  <option value="">Choose who you are</option>
                  <option value="voter">Voter</option>
                  <option value="candidate">Candidate</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={handleSubmit}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
