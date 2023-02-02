import { React, useEffect, useState } from "react";
import axios from "axios";
import "./appointment.css";
import Nav from "../nav/Nav";
import { Button } from "@mui/material";

export default function Appointment() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);
  useEffect(() => {
    const id = localStorage.getItem("userDetails");
    console.log("docId", id);
    axios.get(`http://localhost:2000/viewAppointments/${id}`).then((data) => {
      console.log(data);

      setData(data.data.data);
    });
  }, []);
  console.log("status is", status);

  //Approve appointment
  const approve = (dataId) => {
    console.log("dataId", dataId);
    const fetchedID = dataId;
    axios
      .post(`http://localhost:2000/viewAppointments/approve/${fetchedID}`)
      .then((detail) => {
        console.log(detail.data.message);
      });
    window.location.reload();
  };

  //Reject appointment
  const reject = (id) => {
    console.log("rjctId", id);
    const fetchedIds = id;
    axios
      .post(`http://localhost:2000/viewAppointments/reject/${fetchedIds}`)
      .then((detail) => {
        console.log(detail.data.message);
      });
      window.location.reload();

  };

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
                  <td>{value.name}</td>
                </tr>
                <tr>
                  <th scope="row">PhoneNumer:</th>
                  <td>{value.phone}</td>
                </tr>
                <tr>
                  {value?.status === 0 ? (
                    <td className="appointment-button">
                      <Button
                        style={{ right: "45px" }}
                        onClick={() => approve(value._id)}
                        variant="contained"
                        size="small"
                      >
                        Approve
                      </Button>
                    </td>
                  ) : (
                    ""
                  )}
                  {value?.status === 0 ? (
                    <Button
                      onClick={() => reject(value._id)}
                      style={{ left: "45px" }}
                      size="small"
                      color="error"
                      variant="contained"
                    >
                      Reject
                    </Button>
                  ) : (
                    ""
                  )}
                </tr>

                {value.status === 1 ? (
                  <td>
                    <span>Approved</span>
                  </td>
                ) : (
                  ""
                )}
                {value.status === 2 ? (
                  <td>
                    <span>Rejected</span>
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

// {data.map((value) => (
//   <div className="list-container">
//     <ul className="docList">
//       <li>
//         <span className="docData">Name:</span>
//         <span className="docDetails"> {value?.name}</span>{" "}
//       </li>

//       <li>
//         <span className="docData">PhoneNum:</span>
//         <span className="docDetails">{value?.phone}</span>
//       </li>
//       <li>
//         <span className="docData">Address:</span>
//         <span className="docDetails">{value?.address}</span>
//       </li>
//       <li className="appointment-button">
//         {value.status === 0 ?
//           <Button
//             style={{ right: "45px" }}
//             onClick={() => approve(value._id)}
//             variant="contained"
//             size="small"
//           >
//             Approve
//           </Button>
//          :
//           ""
//         }
//         {value.status === 0 ?
//           <Button
//             style={{ left: "45px" }}
//             size="small"
//             color="error"
//             variant="contained"
//           >
//             Reject
//           </Button>
//          :
//           ""
//         }
//       </li>
//       {value.status===1 ?
//       <li>
//         <span>Approved</span>
//       </li>
//       : ""
//       }
//       {value.status===2?
//     <li>
//       <span>Rejected</span>
//     </li> : ""
//     }
//     </ul>
//   </div>
// ))}
