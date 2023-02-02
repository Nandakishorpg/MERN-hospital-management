import React, { useState } from "react";
import axios from "axios";
import "./patientRegister.css";
import { ToastContainer, toast } from "react-toastify";

export default function PatientRegister() {
  const [register, setRegister] = useState([]);

  const register_here = (event) => {
    event.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    axios
      .post("http://localhost:2000/register/patientReg", register, headers)
      .then((registerData) => {
        console.log(registerData.data.message);
      });
  };

  const getValue = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setRegister({ ...register, [name]: value });
    console.log(register);
  };

  return (
    <div className="reg">
      <div className="container">
        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-9 col-xl-7">
                <div
                  className="card shadow-2-strong card-registration"
                  style={{ borderradius: "15px" }}
                >
                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Patient Registration</h3>
                    <form onSubmit={register_here}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              onChange={getValue}
                              name="name"
                              type="text"
                              id="firstName"
                              className="form-control form-control-lg"
                            />
                            <label className="form-label" for="firstName">
                              Name
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <input
                              onChange={getValue}
                              name="address"
                              type="tel"
                              id="phoneNumber"
                              className="form-control form-control-lg"
                            />
                            <label className="form-label" for="phoneNumber">
                              Address
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <input
                              onChange={getValue}
                              name="phone"
                              type="phone"
                              id="emailAddress"
                              className="form-control form-control-lg"
                            />
                            <label className="form-label" for="emailAddress">
                              Phone
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <input
                              onChange={getValue}
                              name="email"
                              type="tel"
                              id="phoneNumber"
                              className="form-control form-control-lg"
                            />
                            <label className="form-label" for="phoneNumber">
                              Email
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              onChange={getValue}
                              name="username"
                              type="text"
                              id="lastName"
                              className="form-control form-control-lg"
                            />
                            <label className="form-label" for="lastName">
                              Username
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              onChange={getValue}
                              name="password"
                              type="text"
                              id="lastName"
                              className="form-control form-control-lg"
                            />
                            <label className="form-label" for="lastName">
                              Password
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                      <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              onChange={getValue}
                              name="image"
                              type="text"
                              id="lastName"
                              className="form-control form-control-lg"
                            />
                            <label className="form-label" for="lastName">
                              image
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-2">
                        <input
                          className="btn btn-primary btn-lg"
                          type="submit"
                          value="Submit"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer>
        position="top-right" autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick rtl={false}
        pauseOnFocusLoss draggable pauseOnHover
      </ToastContainer>
    </div>
  );
}
