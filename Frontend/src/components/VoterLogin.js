import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./signin.css"

function VoterLogin(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://matdaan-1.onrender.com/voter/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.msg=='success') {
      localStorage.setItem("token", json.token);
      localStorage.setItem("firstName", json.user.firstName);
      localStorage.setItem("lastName", json.user.lastName);
      localStorage.setItem("mobileNumber", json.user.mobileNumber);
      localStorage.setItem("voterAddress", json.voterAddress);
      localStorage.setItem("voter_id", json.user._id);
      localStorage.setItem("email", json.user.email);
      navigate("/voter/home");
    } else {
      alert("Invalid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="intro">
        <div
          className="mask d-flex align-items-center h-100"
          style={{ backgroundColor: "#D6D6D6" }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card" style={{ borderRadius: "1rem" }}>
                  <div className="card-body p-5 text-center">
                    <div className="my-md-5 pb-5">
                      <h1 className="fw-bold mb-0">Welcome back! Voter</h1>

                      <i className="fas fa-user-astronaut fa-3x my-5"></i>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="typeEmail"
                          onChange={onChange}
                          name="email"
                          value={credentials.email}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="typeEmail">
                          Email
                        </label>
                      </div>

                      <div className="form-outline mb-5">
                        <input
                          type="password"
                          id="typePassword"
                          className="form-control form-control-lg"
                          name="password"
                          value={credentials.password}
                          onChange={onChange}
                        />
                        <label className="form-label"  
                        for="typePassword">
                          Password
                        </label>
                      </div>

                      <button
                        className="btn btn-primary btn-lg btn-rounded gradient-custom text-body px-5"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Login
                      </button>
                    </div>

                    <div>
                      <p className="mb-0">
                        Don't have an account?{" "}
                        <Link to='../voter/signup' className="text-body fw-bold">
                          Sign Up
                        </Link>
                      </p>
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

export default VoterLogin;
