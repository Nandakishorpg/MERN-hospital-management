import React, { useEffect, useState } from "react";
import "./docProfile.css";
import axios from "axios";
import Nav from "../nav/Nav";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";

export default function DocProfile() {
  const [file, setFile] = useState([]);
  const [loginid,setloginid]=useState(JSON.parse(localStorage.getItem("userDetails")))
  const [data, setData] = useState({
    loginid:loginid
  });


  console.log("file", file);
  console.log("data", data);

  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //edit and update
  const editData = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData({ ...data, [name]: value });
  };

  const update = (event) => {
    event.preventDefault();
    console.log("update",data);

    axios
      .post("http://localhost:2000/profile/docupdate", data)
      .then((response) => {
        console.log(response.data.message); 
      });
  };

  ////////////

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userDetails"));
    console.log(userId);
    const id = { userId: userId };
    axios.post("http://localhost:2000/profile/docProfile", id).then((re) => {
      console.log(re);
      console.log(re.data.data);
      setUserData(re.data.data);
    });
  }, []);
  console.log("userdata", userData);
  console.log("data", data);
  console.log("loginid",loginid);
  return (
    <div>
      <Nav></Nav>
      <div className="container">
        <div className="squareContainer">
          <div className="square">
            <div className="box1">
             
              <Button onClick={handleOpen}>Edit</Button>
              <Modal
                className="modalForm"
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div>
                  <form className="formClass" onSubmit={update}>
                    <div class="form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="name"
                        onChange={editData}
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        name="email"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="email"
                        onChange={editData}
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        name="phone"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="phone"
                        onChange={editData}
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        name="department"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="department"
                        onChange={editData}
                      />
                    </div>

                    <div class="form-group">
                      <input
                        type="file"
                        name="image"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="Choose Profile  Pic"
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                          setData({ ...data, image: e.target.files[0].name });
                        }}
                      />
                    </div>

                    <button type="submit" class="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </Modal>
              {/* <div className="from">
                <div class="form-group">
                  <input
                    type="file"
                    name="image"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="choose Profilepic"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      setPic({ image: e.target.files[0].name });
                    }}
                  />
                </div>
              </div> */}
            </div>
            <div className="box2">
              <table className="table table-borderless table-sm">
                <tr>
                  <td>
                  <img src={userData?.image} alt="" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>{userData?.name}</b>
                  </td>
                </tr>
                <tr>
                  <td>{userData?.email}</td>
                </tr>
                <tr>
                  <td>{userData?.phone}</td>
                </tr>
                <tr>
                  <td>{userData?.address}</td>
                </tr>
                <tr>
                  <td>{userData?.department}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
