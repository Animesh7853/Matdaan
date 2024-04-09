import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
export default function VoterSignup() {

  let navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    aadharNumber:'',
    mobileNumber: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/voter/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        aadharNumber:data.aadharNumber,
        mobileNumber: data.mobileNumber,
        password: data.password,
      }),
    });
    const json = await response.json();
    if (json.msg === "success") {
      alert("Congrats You are successfully registered to cast your vote");
      localStorage.setItem('token', json.token);
      navigate("../voter/login");
    }
    else if(json.msg!="success"){
      alert("Registration failed")
    }
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container register">
        <div className="row">
          <div className="col-md-3 register-left">
            <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
            <h3>Welcome</h3>
            <p>You are 30 seconds away from casting your 1st vote.</p>
            <input type="submit" name="" value="Login" />
            <br />
          </div>
          <div className="col-md-9 register-right">
            <ul
              className="nav nav-tabs nav-justified"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="false"
                >
                  Voter
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Candidate
                </a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <h3 className="register-heading">Apply as a Employee</h3>
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
                    <input
                      type="submit"
                      className="btnRegister"
                      value="Register"
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade show"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <h3 className="register-heading">Apply as a Hirer</h3>
                <div className="row register-form">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name *"
                        value=""
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name *"
                        value=""
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email *"
                        value=""
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        maxlength="10"
                        minlength="10"
                        className="form-control"
                        placeholder="Phone *"
                        value=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password *"
                        value=""
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password *"
                        value=""
                      />
                    </div>
                    <div className="form-group">
                      <select className="form-control">
                        <option className="hidden" selected disabled>
                          Please select your Sequrity Question
                        </option>
                        <option>What is your Birthdate?</option>
                        <option>What is Your old Phone Number</option>
                        <option>What is your Pet Name?</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="`Answer *"
                        value=""
                      />
                    </div>
                    <input
                      type="submit"
                      className="btnRegister"
                      value="Register"
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
