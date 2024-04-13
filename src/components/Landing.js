import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      <div
        className="container-fluid vh-100 d-flex justify-content-center align-items-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30436.jpg?t=st=1711991323~exp=1711994923~hmac=0e51959ac90b57bcc115b86292b659a2b321bcfc53f6be4c6650cd4e30fb6028&w=996')",
          backgroundSize: "cover",
        }}
      >
        <div className="text-center">
          <h1 className="text-info">🗳️ Welcome to Matdaan! 📮</h1>
          <h2 className="text-secondary">
            Cast your vote and be a part of shaping the future!
          </h2>

          <span className="border-left">
            <button
              type="button"
              className="btn btn-outline-info btn-lg"
              onClick={() => setShowModal(true)}
            >
              Get Started
            </button>
          </span>

          {/* Modal */}
          {showModal && (
            <div
              className="modal fade show"
              style={{ display: "block" }}
              tabIndex="-1"
            >
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
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
                      className="btn btn-danger"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleSubmit}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
