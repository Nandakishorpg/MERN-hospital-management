const express = require("express");
const registerRouter = express.Router();
const regDoctor = require("../models/docRegister");
const regPatient = require("../models/patientRegister");
const login = require("../models/login");
const bcrypt = require("bcryptjs");

registerRouter.post("/", function (req, res) {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      return res.sendStatus(400).json({
        success: false,
        error: true,
        message: "password hashing error",
      });
    } else {
      let loginData = {
        username: req.body.username,
        password: hashedPass,
        role: 1,
      };
      login.findOne({ username: req.body.username }).then((username) => {
        if (username) {
          return res.status(400).json({
            success: false,
            error: true,
            message: "username already exist",
          });
        } else {
          let login_item = login(loginData);
          login_item.save().then((logindetails) => {
            let id = logindetails._id;
            let register = {
              login_id: id,
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
              qualification: req.body.qualification,
              department: req.body.department,
            };

            regDoctor.findOne({ phone: register.phone }).then((mobile) => {
              if (!mobile) {
                let register_item = regDoctor(register);
                console.log("doctorRegData",register_item);

                register_item.save().then(() => {
                  res.status(200).json({
                    success: true,
                    error: false,
                    message: "registration completed",
                  });
                });
              } else {
                login.deleteOne({ _id: id }).then(() => {
                  res.status(401).json({
                    success: false,
                    error: true,
                    message: "Mobile number already registered",
                  });
                });
              }
            });
          });
        }
      });
    }
  });
});




registerRouter.post("/patientReg", function (req, res) {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      return res.sendStatus(400).json({
        success: false,
        error: true,
        message: "password hashing error",
      });
    } else {
      let loginData = {
        username: req.body.username,
        password: hashedPass,
        role: 2,
      };
      login.findOne({ username: req.body.username }).then((username) => {
        if (username) {
          return res.status(400).json({
            success: false,
            error: true,
            message: "username already exist",
          });
        } else {
          let login_item = login(loginData);
          login_item.save().then((logindetails) => {
            let id = logindetails._id;
            let register = {
              login_id: id,
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
              address: req.body.address,
              image: req.body.image,
            };
            regPatient.findOne({ phone: register.phone }).then((mobile) => {
              if (!mobile) {
                let register_item = regPatient(register);
                console.log("patientRegData",register_item);
                register_item.save().then(() => {
                  res.status(200).json({
                    success: true,
                    error: false,
                    message: "registration completed",
                  });
                });
              } else {
                login.deleteOne({ _id: id }).then(() => {
                  res.status(401).json({
                    success: false,
                    error: true,
                    message: "Mobile number already registered",
                  });
                });
              }
            });
          });
        }
      });
    }
  });
});

module.exports = registerRouter;
