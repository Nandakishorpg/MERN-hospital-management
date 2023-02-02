const express = require("express");
const loginRouter = express.Router();
const login = require("../models/login");
var jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

loginRouter.post("/", function (req, res) {
  console.log("hiii");
  console.log(req.body.username);
  let fetchedUser;
  login
    .findOne({ username: req.body.username })
    .then((user) => {
      console.log("data", user);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: true,
          message: "user not found",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          success: false,
          error: true,
          message: "Please Check Password!",
        });
      }
      console.log("fetch", fetchedUser);
      var token = jwt.sign({ 
        loginId: fetchedUser._id,
        username: fetchedUser.username,
        role: fetchedUser.role},
        "apple",
        {expiresIn:"2h"});
      return res.status(200).json({
        success: true,
        error: false,
        token:token,
        loginId: fetchedUser._id,
        username: fetchedUser.username,
        role: fetchedUser.role,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        success: true,
        error: false,
        message: err,
      });
    });
});

module.exports = loginRouter;
