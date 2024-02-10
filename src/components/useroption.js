import React, { useState } from "react";
import "./useroption.css";
import NavBar from "./NavBar";
import Login from "./Login";

export default function Useroption() {
  const [role, setRole] = useState("voter");

  const voterLogin = () => {
    setRole("Voter");
  };

  const adminLogin = () => {
    setRole("admin");
  };

  const candidateLogin = () => {
    setRole("candidate");
  };
  return (
    <>
      <NavBar />
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
                  <button
                    type="button"
                    class="btn btn-outline-info my-2 mx-3"
                    onClick={voterLogin}
                  >
                    Voter
                  </button>

                  <button
                    type="button"
                    class="btn btn-outline-warning my-2 mx-3"
                    onClick={candidateLogin}
                  >
                    Candidate
                  </button>

                  <button
                    type="button"
                    class="btn btn-outline-danger my-2 mx-3"
                    onClick={adminLogin}
                  >
                    Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
          <section className="vh-100" style={{ backgroundColor: "#white" }}>
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                  <div className="card" style={{ borderRadius: "1rem" }}>
                    <div className="row g-0">
                      <div className="col-md-6 col-lg-5 d-none d-md-block">
                        <img
                          src="https://images.pexels.com/photos/4669114/pexels-photo-4669114.jpeg?auto=compress&cs=tinysrgb&w=600"
                          className="img-fluid"
                          style={{ borderRadius: "1rem 0 0 1rem" }}
                        />
                      </div>
                      <div className="col-md-6 col-lg-7 d-flex align-items-center">
                        <div className="card-body p-4 p-lg-5 text-black">
                          <form>
                            <div className="d-flex align-items-center mb-3 pb-1">
                              <i
                                className="fas fa-cubes fa-2x me-3"
                                style={{ color: "#ff6219" }}
                              ></i>
                              <span className="h1 fw-bold mb-0">
                                {role} Login
                              </span>
                            </div>

                            <h5
                              className="fw-normal mb-3 pb-3"
                              style={{ letterSpacing: "1px" }}
                            >
                              Sign into your account
                            </h5>

                            <div className="form-outline mb-4">
                              <input
                                type="email"
                                id="form2Example17"
                                className="form-control form-control-lg"
                                placeholder="Enter your Username here"
                                aria-label="default input example"
                              />
                            </div>

                            <div className="form-outline mb-4">
                              <input
                                type="password"
                                id="form2Example27"
                                className="form-control form-control-lg"
                                placeholder="Enter your Password "
                                aria-label="default input example"
                              />
                            </div>

                            <div className="pt-1 mb-4">
                              <button
                                className="btn btn-dark btn-lg btn-block"
                                type="button"
                              >
                                Login
                              </button>
                            </div>

                            <a className="small text-muted" href="#!">
                              Forgot password?
                            </a>
                            <p
                              className="mb-5 pb-lg-2"
                              style={{ color: "#393f81" }}
                            >
                              Don't have an account?{" "}
                              <a href="#!" style={{ color: "#393f81" }}>
                                Register here
                              </a>
                            </p>
                            <a href="#!" className="small text-muted">
                              Terms of use.
                            </a>
                            <a href="#!" className="small text-muted">
                              Privacy policy
                            </a>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
