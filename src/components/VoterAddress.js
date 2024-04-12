import React, { useState } from "react";

function VoterAddress() {
    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        pinCode: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:8000/voter/add-voter", {
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
                                        Place order
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
                                <div className="col-md-8">
                                    <p className="mb-0 text">Name</p>
                                    <p className="mb-0 text-descriptions">Age</p>
                                    <p className="mb-0 text-descriptions ">State</p>
                                    <p className="mb-0 text-descriptions ">Mobile Number</p>

                                </div>
                            </div>
                            <div className="card-footer mt-4">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 text-muted">
                                        E-mail:
                                        <span>dsdd</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0 fw-bold ">
                                        Election-id:
                                        <span>sdaiudbsajdoSBD213213</span>
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

export default VoterAddress;
