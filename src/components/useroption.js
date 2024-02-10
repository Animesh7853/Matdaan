import React from "react";
import "./useroption.css";

export default function useroption() {
  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form>
                <div>
                {" "}
                  <button type="button" class="btn btn-outline-info my-2 mx-3">
                   Voter
                  </button>
               

                
                  {" "}
                  <button type="button" class="btn btn-outline-warning my-2 mx-3">
                   Candidate
                  </button>
              
                
                  {" "}
                 
                  <button type="button" class="btn btn-outline-danger my-2 mx-3">
                    Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
