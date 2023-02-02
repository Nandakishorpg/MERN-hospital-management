import React, { useState } from "react";
import axios from "axios";
import "./register.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Register() {
  const [register, setRegister] = useState([]);

  const register_here = (event) => {
    event.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    axios
      .post("http://localhost:2000/register", register, headers)
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
      <div id="formBg" className="container">
        <section className="vh-100 gradient-custom">
          <div class="container py-5 h-100">
            <div class="row justify-content-center align-items-center h-100">
              <div class="col-12 col-lg-9 col-xl-7">
                <div
                  class="card shadow-2-strong card-registration"
                  style={{ borderradius: "15px" }}
                >
                  <div style={{ height: "640px" }} class="card-body p-4 p-md-5">
                    <h3
                      style={{ color: "green" }}
                      class="mb-4 pb-2 pb-md-0 mb-md-5"
                    >
                      {" "}
                      Doctor Registration
                    </h3>
                    <form onSubmit={register_here}>
                      <div class="row">
                        <div class="col-md-6 mb-4">
                          <div class="form-outline">
                            <input
                              onChange={getValue}
                              name="name"
                              type="text"
                              id="firstName"
                              class="form-control form-control-lg"
                            />
                            <label class="form-label" for="firstName">
                              Name
                            </label>
                          </div>
                        </div>
                        <div class="col-md-6 mb-4 pb-2">
                          <div class="form-outline">
                            <input
                              onChange={getValue}
                              name="address"
                              type="tel"
                              id="phoneNumber"
                              class="form-control form-control-lg"
                            />
                            <label class="form-label" for="phoneNumber">
                              Address
                            </label>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6 mb-4 pb-2">
                          <div class="form-outline">
                            <input
                              onChange={getValue}
                              name="phone"
                              type="phone"
                              id="emailAddress"
                              class="form-control form-control-lg"
                            />
                            <label class="form-label" for="emailAddress">
                              Phone
                            </label>
                          </div>
                        </div>
                        <div class="col-md-6 mb-4 pb-2">
                          <div class="form-outline">
                            <input
                              onChange={getValue}
                              name="email"
                              type="tel"
                              id="phoneNumber"
                              class="form-control form-control-lg"
                            />
                            <label class="form-label" for="phoneNumber">
                              Email
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div class="col-md-6 mb-4">
                          <div class="form-outline">
                            <input
                              onChange={getValue}
                              name="department"
                              type="text"
                              id="lastName"
                              class="form-control form-control-lg"
                            />
                            <label class="form-label" for="lastName">
                              Department
                            </label>
                          </div>
                        </div>
                        <div class="col-md-6 mb-4 d-flex align-items-center">
                          <div class="form-outline datepicker w-100">
                            <input
                              onChange={getValue}
                              name="qualification"
                              type="text"
                              class="form-control form-control-lg"
                              id="birthdayDate"
                            />
                            <label for="birthdayDate" class="form-label">
                              Qualification
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div class="col-md-6 mb-4">
                          <div class="form-outline">
                            <input
                              onChange={getValue}
                              name="username"
                              type="text"
                              id="lastName"
                              class="form-control form-control-lg"
                            />
                            <label class="form-label" for="lastName">
                              Username
                            </label>
                          </div>
                        </div>
                        <div class="col-md-6 mb-4">
                          <div class="form-outline">
                            <input
                              onChange={getValue}
                              name="password"
                              type="text"
                              id="lastName"
                              class="form-control form-control-lg"
                            />
                            <label class="form-label" for="lastName">
                              Password
                            </label>
                          </div>
                        </div>
                      </div>

                      <div class="mt-4 pt-2">
                        <input
                          class="btn btn-secondary btn-lg"
                          type="submit"
                          value="Submit"
                        />
                        <div className="clickHere">
                          <Link style={{ color: "black" }} to="/patientreg">
                            Patient Registration
                          </Link>
                        </div>
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
