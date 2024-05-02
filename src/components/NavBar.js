import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
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
            <a className="navbar-brand mt-2 mt-lg-0" href="#">
              <img
                src="https://tse1.mm.bing.net/th?id=OIP.udhM1U9KYx3_9z1V0t3hmgHaHa&pid=Api&P=0&h=180"
                height="30"
                alt="MDB Logo"
                loading="lazy"
              />
            </a>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-light mx-3" to={props.home}>
                 Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to = "/election/result"  className="nav-link text-light mx-3" >
                  Election Result
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light mx-3" to={props.election}>
                  Elections
                </Link>
              </li>
            </ul>
          </div>

        
        </div>
      </nav>
    </>
  );
}
