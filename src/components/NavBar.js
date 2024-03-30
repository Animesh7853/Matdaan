import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to = "/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to = "/about">
                  About Us
                </Link>
              </li>
              
              
            </ul>
            <form className="d-flex" role="search">
             <div class="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                <Link> <button className="btn btn-primary" to = "/login">Login</button> </Link>
                <Link> <button className="btn btn-primary" to = "/signup">Sign Up</button> </Link>

              </div>
              
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
