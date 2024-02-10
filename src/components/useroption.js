import React from "react";
import "./useroption.css";
import NavBar from "./NavBar";

export default function useroption() {
  return (
    <>
    <NavBar/>
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
                  <button type="button" class="btn btn-outline-info my-2 mx-3">
                    Voter
                  </button>

                  <button
                    type="button"
                    class="btn btn-outline-warning my-2 mx-3"
                  >
                    Candidate
                  </button>

                  <button
                    type="button"
                    class="btn btn-outline-danger my-2 mx-3"
                  >
                    Admin
                  </button>
                </div>
                {/* <div>
                  <div
                    id="carouselExampleIndicators"
                    class="carousel slide"
                    data-ride="carousel"
                  >
                    <ol class="carousel-indicators">
                      <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="0"
                        class="active"
                      ></li>
                      <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="1"
                      ></li>
                      <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="2"
                      ></li>
                    </ol>
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img
                          class="d-block w-100"
                          src="https://tse4.mm.bing.net/th?id=OIP.mTiUlBqW77PMdMMBma86PQHaFY&pid=Api&P=0&h=180"
                          alt="First slide"
                        />
                      </div>
                      <div class="carousel-item">
                        <img
                          class="d-block w-100"
                          src="..."
                          alt="Second slide"
                        />
                      </div>
                      <div class="carousel-item">
                        <img
                          class="d-block w-100"
                          src="..."
                          alt="Third slide"
                        />
                      </div>
                    </div>
                    <a
                      class="carousel-control-prev"
                      href="#carouselExampleIndicators"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a
                      class="carousel-control-next"
                      href="#carouselExampleIndicators"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
