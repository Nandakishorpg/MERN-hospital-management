import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import "./docList.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function DocList() {
  const [ids,Setids] = useState([]);
  const [doc, Setdoc] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:2000/docView").then((data) => {
      console.log(data.data.data);
      Setdoc(data.data.data);
    });
  }, []);
  console.log(doc);


  const booking = (id) => {
    const patientId=JSON.parse( localStorage.getItem("userDetails"))
    console.log("patientId",patientId);
    console.log("docId",id);
    const detail={
      patientId:patientId,
      docId:id,
      status:0
    }
    Setids(detail)
    console.log("BothID",detail);
    axios.post("http://localhost:2000/booking", ids).then((res) => {
      console.log(res.data.message);
    });
  };
  return (
    <div>
      <div className="container">
        <Nav />
        <div className="bookingStatus">
          <Link style={{paddingLeft: 13, textDecoration: 'none'}} className="bookingButton" to={'/bookingstatus'}>
         <Button color="secondary" variant="contained">
        <span className="bookingButton"> Booking Status</span>
         </Button>
            
          </Link>
        </div>
        <div className="doctorsList">
          {doc.map((value) => (
            <div className="list-container">
              <ul className="docList">
                <li>
                  <span className="docData">Name:</span>
                  <span className="docDetails"> {value.name}</span>{" "}
                </li>
                <li>
                  <span className="docData">Department:</span>
                  <span className="docDetails">{value.department}</span>{" "}
                </li>
                <li>
                  <span className="docData">qualification:</span>
                  <span className="docDetails">{value.qualification}</span>
                </li>
                <li>
                  <span className="docData">PhoneNum:</span>
                  <span className="docDetails">{value.phone}</span>
                </li>
                <li>
                  <span className="docData">Email:</span>
                  <span className="docDetails">{value.email}</span>
                </li>
                <li className="appointment-button">
                  <Button
                    onClick={() => booking(value.login_id)}
                    variant="contained"
                    size="small"
                  >
                    Book Appointment
                  </Button>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
