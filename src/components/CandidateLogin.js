import React, { useState } from "react";
import { Link, createBrowserRouter } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";

function CandidateLogin(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/candidate/signin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.msg=='success') {
      localStorage.setItem('token', json.authtoken);
      navigate('/candidate/home') ;
    } else {
      alert("Invalid credentials");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div
                className="card"
                style={{ borderRadius: "1rem", backgroundColor: "#424242" }}
              >
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block text-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="login form"
                      className="img-fluid mx-auto"
                      style={{
                        borderRadius: "1rem 0 0 1rem",
                        margin: "auto",
                        display: "block",
                      }}
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
                          <span className="h1 fw-bold mb-0">Logo</span>
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px", color: "#E3E3E7" }}
                        >
                          Sign into your account as Candidate
                        </h5>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            name="email" // Add name attribute
                            value={credentials.email}
                            onChange={onChange}
                            style={{ color: "#E3E3E7" }}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example17" // Use htmlFor instead of for
                          >
                            Email address
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            name="password" // Add name attribute
                            value={credentials.password}
                            onChange={onChange}
                            style={{ color: "#E3E3E7" }}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example27" // Use htmlFor instead of for
                          >
                            Password
                          </label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="button"
                            onClick={handleSubmit}
                          >
                            Login
                          </button>
                        </div>

                      </form>
                      <a className="small text-danger" href="#!">
                        Forgot password?
                      </a>
                      <p
                        className="mb-5 pb-lg-2"
                        style={{ color: "whitesmoke" }}
                      >
                        Don't have an account?{" "}
                        <Link to="/candidate/signup" className="text-info">
                          Register here
                        </Link>
                      </p>
                      <a href="#!" className="small text-info ">
                        Terms of use.{"  "}
                      </a>
                      <a href="#!" className="small text-info">
                        Privacy policy
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CandidateLogin;
