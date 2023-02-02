import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import "./profile.css";

export default function Profile() {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userDetails"));
    console.log(userId);
    const id = { userId: userId };
    axios.post("http://localhost:2000/profile", id).then((re) => {
      console.log(re.data.data);
      setUserData(re.data.data);
    });
  }, []);
  console.log("userdata", userData);
  return (
    <div>
      <Nav/>
      <div className="container">
        <div className="squareContainer">
          <div className="square">

            <div className="box1">
              
            </div>
            <div className="box2">
              <table className="table table-borderless table-sm">
                <tr>
                  <td><b>{userData?.name}</b> 
                   
                  </td>
                  </tr>
                <tr>
                  <td>{userData?.email}
                   
                  </td>
                </tr>
                <tr>
                  <td>{userData?.phone}</td>
                </tr>
                <tr>
                  <td>{userData?.address}</td>
                </tr>
              </table>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}
