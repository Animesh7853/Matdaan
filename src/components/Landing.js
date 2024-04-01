import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
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
            class="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">...</div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Save changes
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
