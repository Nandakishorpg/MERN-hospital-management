import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import "./bookingstatus.css";
import { Button } from "@mui/material";

export default function Bookingstatus() {
  const [data,setdata] = useState([]);
//   const [status, setStatus] = useState([]);
  useEffect(() => {
    const patientId=localStorage.getItem("userDetails")
    console.log('patientId',patientId);
    axios
      .post(`http://localhost:2000/viewAppointments/viewstatus/${patientId}`)
      .then((patientsBookings) => {
        setdata(patientsBookings.data.data)
      });
  }, []);
  console.log("patientsBookings",data);


  return (
    <div>
      <div className="container">
        <Nav />
        <div className="doctorsList">
          {data?.map((value) => (
            <div className="list-container">
              <table class="table table-borderless table-sm">
                <tr>
                  <th scope="row">Name:</th>
                  <td>{value?.name}</td>
                </tr>
                <tr>
                  <th scope="row">PhoneNumer:</th>
                  <td>{value?.phone}</td>
                </tr>
                <tr>
                  <th scope="row">Department:</th>
                  <td>{value?.department}</td>
                </tr>
                {value.status===0 ?
            <td colSpan={2}><span style={{color:'blue'}}>Pending Appointment</span></td>  : ""  
            }
                <tr>

                </tr>
               

                {value?.status === 1 ? (
                  <td>
                    <span className="approved"><b>Approved</b> </span>
                  </td>
                ) : (
                  ""
                )}
                {value?.status === 2 ? (
                  <td>
                    <span className="Rejected" >Rejected</span>
                  </td>
                ) : (
                  ""
                )}
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
