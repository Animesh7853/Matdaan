import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
export default function CandidateSignup() {
  let navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    aadharNumber: "",
    mobileNumber: "",
    password: "",
    election: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/candidate/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        aadharNumber: data.aadharNumber,
        mobileNumber: data.mobileNumber,
        password: data.password,
        election: data.election
      }),
    });
    const json = await response.json();
    if (json.msg == "success") {
      alert("Congrats You are successfully registered to cast your vote");
      localStorage.setItem("token", json.token);
      navigate("../candidate/login");
    } 
    else if (json.msg != "success") {
      alert("Registration failed");
    }
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data.election);
  };

  return (
    <>
      <div className="container register">
        <div className="row">
          <div className="col-md-3 register-left">
            <img
              src="https://static.vecteezy.com/system/resources/previews/000/680/173/original/voting-political-hand-holding-election-concept.jpg"
              alt=""
            />
            <h3>Welcome</h3>
            <p>You are only 30 seconds away from creating history...</p>
            <p>Already have an account? Login in from here</p>
            <Link to="/candidate/login">
              <button className="btn btn-primary" type="Login">
                Login
              </button>{" "}
            </Link>
            <br />
          </div>
          <div className="col-md-9 register-right">
            <ul
              className="nav nav-tabs nav-justified"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  to="/candidate/signup"
                  role="tab"
                  aria-controls="home"
                  aria-selected="false"
                >
                  Candidate
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  id="profile-tab"
                  data-toggle="tab"
                  to="/voter/signup"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Voter
                </Link>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <h3 className="register-heading">Register as a Candidate</h3>
                <div className="row register-form">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name *"
                        value={data.firstName}
                        name="firstName"
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name *"
                        value={data.lastName}
                        name="lastName"
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password *"
                        value={data.password}
                        name="password"
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password *"
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group">
                      <div className="maxl">
                        <label className="radio inline">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked
                          />
                          <span> Male </span>
                        </label>
                        <label className="radio inline">
                          <input type="radio" name="gender" value="female" />
                          <span>Female </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Your Email *"
                        value={data.email}
                        name="email"
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        minlength="10"
                        maxlength="10"
                        name="mobileNumber"
                        className="form-control"
                        placeholder="Your Phone *"
                        value={data.mobileNumber}
                        onChange={onChange}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        minlength="10"
                        maxlength="10"
                        name="aadharNumber"
                        className="form-control"
                        placeholder="Your Aadhar *"
                        value={data.aadharNumber}
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group">
                      <select
                        className="form-select"
                        name="election"
                        value={data.election}
                        onChange={onChange}
                        aria-label="Default select example"
                      >
                        <option selected>Choose your Election-Type *</option>
                        <option value="LOKSABHA">LOKSABHA</option>
                        <option value="VIDHANSABHA">VIDHANSABHA</option>
                        <option value="MUNICIPAL">MUNICIPAL</option>
                      </select>
                    </div>
                    <input
                      type="submit"
                      className="btnRegister"
                      value="Register"
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
