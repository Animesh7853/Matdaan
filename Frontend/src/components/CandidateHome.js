import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CandidateAddress from "./CandidateAddress";
function CandidateHome() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/candidate/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/candidate/login");
  };
  return (
    <>
      {isAuthenticated && (
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
              <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a
                  href="/"
                  className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                >
                  <span className="fs-5 d-none d-sm-inline">Menu</span>
                </a>
                <ul
                  className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                  id="menu"
                >
                  <li className="nav-item">
                    <Link to="/candidate/home" className="nav-link align-middle px-0">
                      <span className="ms-1 d-none d-sm-inline">Home</span>
                    </Link>
                  </li>
              
                  <li>
                    <Link to='/election/result' className="nav-link px-0 align-middle">
                      <i className="fs-4 bi-table"></i>{" "}
                      <span className="ms-1 d-none d-sm-inline">
                        {" "}
                        Election Results
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/feedback" className="nav-link px-0 align-middle">
                      <i className="fs-4 bi-table"></i>{" "}
                      <span className="ms-1 d-none d-sm-inline">
                        {" "}
                        Give Feedback
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/news" className="nav-link px-0 align-middle">
                      <i className="fs-4 bi-table"></i>{" "}
                      <span className="ms-1 d-none d-sm-inline">
                        {" "}
                        Read News
                      </span>
                    </Link>
                  </li>
                </ul>
                <hr />
                <div className="dropdown pb-4">
                  <a
                    href="#"
                    className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                    id="dropdownUser1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://tse4.mm.bing.net/th?id=OIP.x4J5z_zdACkGt9poqUxVRQHaHa&pid=Api&P=0&h=180"
                      alt="hugenerd"
                      width="30"
                      height="30"
                      className="rounded-circle"
                    />
                    <span className="d-none d-sm-inline mx-1">{localStorage.getItem('firstName')}</span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                   
                    <li>
                      <a className="dropdown-item" href="#">
                        Profile
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={handleLogout}>
                        Log out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col py-3">
              <CandidateAddress/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CandidateHome;
