import React, { useState } from "react";

function CandidateAddress() {
    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        pinCode: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:8000/candidate/add-candidate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                street: address.street,
                city: address.city,
                state: address.state,
                pinCode: address.pinCode,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.msg === "Address added successfully") {
                    alert("Address added successfully");
                }
                if (data.msg === "Address updated successfully") {
                    alert("Address updated successfully");
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const onChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };
    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8">
                    <div className="card mb-4">
                        <div className="card-header py-3">
                            <div class="alert alert-danger" role="alert">
                                We have found that you have not given your address. Kindly fill it!
                            </div>
                            <h5 className="mb-0 text-font text-uppercase">Your address</h5>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="street"
                                            value={address.street}
                                            onChange={onChange}
                                            className="form-control"
                                            placeholder="Your Street"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="city"
                                            value={address.city}
                                            onChange={onChange}
                                            className="form-control"
                                            placeholder="Your City"
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="state"
                                        value={address.state}
                                        onChange={onChange}
                                        className="form-control"
                                        placeholder="Your State"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        onChange={onChange}
                                        name="pinCode"
                                        value={address.pinCode}
                                        className="form-control"
                                        placeholder="Pincode"
                                    />
                                </div>

                                <div className="mb-3">
                                    <textarea
                                        className="form-control"
                                        placeholder="Any additional information you would like to give "
                                        rows="4"
                                    ></textarea>
                                </div>


                                <div className="text-center">

                                    <button type="button" onClick={handleSubmit} className="btn btn-outline-dark col-md-10">
                                        Submit your address
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-header py-3">
                            <h5 className="mb-0 text-font">
                                Your Profile

                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <img
                                        src="https://tse4.mm.bing.net/th?id=OIP.x4J5z_zdACkGt9poqUxVRQHaHa&pid=Api&P=0&h=180"
                                        className="rounded-3"
                                        style={{ width: "100px" }}

                                    />
                                </div>
                                <div className="col-md-8">  <div className="row">
                                        <div className="col">
                                            <p className="mb-0 text">First name:</p>
                                            <p className="mb-0 text">Last name:</p>
                                            <p className="mb-0 text">Mobile No.:</p>
                                        </div>
                                        <div className="col">
                                            <p className="mb-0 text">{localStorage.getItem('firstName')} </p>
                                            <p className="mb-0 text">{localStorage.getItem('lastName')} </p>
                                            <p className="mb-0 text">{localStorage.getItem('mobileNumber')} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer mt-4">
                                <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center px-0 fw-bold ">
                                        <div className="row">
                                            <div className="col">
                                                <p className="mb-0 text">E-Mail:</p>
                                                <p className="mb-0 text">Cand-Id:</p>
                                            </div>
                                            <div className="col">
                                            <p className="mb-0 text">{localStorage.getItem('email')} </p>
                                            <p className="mb-0 text">{localStorage.getItem('cand_id')} </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CandidateAddress;