import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Landing() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [close, setClose] = useState(false);

  let navigate = useNavigate();

  const handleValue = (event) => {
    setSelectedValue(event.target.value);
  }

  const handleSubmit = () => {
    console.log(selectedValue);
    if(selectedValue=='voter'){
      navigate('/voter/Login');
    }
    if(selectedValue=='candidate'){
      navigate('/candidate/Login');
    }
    else if (selectedValue==null){
      alert('Choose your identity');
    }
  }
  const handleClose = () =>{
    setClose(true);
  }


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
              data-bs-toggle="modal"
              data-bs-target="#exampleModalCenter"
            >
              Get Started
            </button>
          </span>
          <div
            className="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Who you are ?
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true" onClick={handleClose}>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <select className="form-select" value={selectedValue} onChange={handleValue} aria-label="Default select example">
                    <option selected>Choose who you are</option>
                    <option value="voter">Voter</option>
                    <option value="candidate">Candidate</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-success" onClick={handleSubmit}>
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
