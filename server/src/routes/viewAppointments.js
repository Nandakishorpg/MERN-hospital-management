const express = require("express");
const { findByIdAndDelete } = require("../models/bookingTable");
const viewAppointments = express.Router();
const booking = require("../models/bookingTable");
var objectId = require("mongodb").ObjectID;
var objectIds = require("mongodb").ObjectID;

viewAppointments.get("/:id", function (req, res) {
  const id = JSON.parse(req.params.id);
  // console.log("doctorId",JSON.parse(id));

  booking
    .aggregate([
      {
        $lookup: {
          from: "patientregister_tbs",
          localField: "patient_id",
          foreignField: "login_id",
          as: "result",
        },
      },
      {
        $unwind: "$result",
      },
      {
        $match: {
          doc_id: objectId(id),
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$result.name" },
          login_id: { $first: "$result.login_id" },
          phone: { $first: "$result.phone" },
          address: { $first: "$result.address" },
          status: { $first: "$status" },
        },
      },
    ])
    .then((data) => {
      console.log("data", data);
      if (data) {
        return res.status(200).json({
          success: true,
          error: false,
          data: data,
        });
      } else {
        return res.status(401).json({
          success: false,
          error: true,
        });
      }
    });
});

viewAppointments.post("/approve/:fetchedID", function (req, res) {
  const dataId = req.params.fetchedID;
  console.log("fetchedID", dataId);
  booking.findById({ _id: dataId }).then((fetchedData) => {
    console.log(fetchedData);
    const status = fetchedData.status;

    booking
      .updateOne({ _id: dataId }, { $set: { status: status + 1 } })
      .then((updatedStatus) => {
        return res.status(200).json({
          success: true,
          error: false,
          message: "Approved And Status increased",
          data: updatedStatus,
        });
      })
      .catch((err) => {
        return res.status(401).json({
          success: false,
          error: true,
          message: "Error",
        });
      });
  });
});

viewAppointments.post("/reject/:fetchedIds", function (req, res) {
  const dataId = req.params.fetchedIds;
  console.log("fetchedID", dataId);
  booking.findById({ _id: dataId }).then((fetchedData) => {
    console.log("rjct", fetchedData);
    const status = fetchedData.status;
    booking
      .updateOne({ _id: dataId }, { $set: { status: status + 2 } })
      .then((updatedRjctStatus) => {
        return res.status(200).json({
          success: true,
          error: false,
          message: "Rejected",
          data: updatedRjctStatus,
        });
      })
      .catch((err) => {
        return res.status(401).json({
          success: false,
          error: true,
          message: "Error",
        });
      });
  });
});

viewAppointments.post("/viewstatus/:patientId", function (req, res) {
  const bookingId = JSON.parse(req.params.patientId);

  booking
    .aggregate([
      {
        $lookup: {
          from: "docregister_tbs",
          localField: "doc_id",
          foreignField: "login_id",
          as: "result",
        },
      },
      {
        $unwind: "$result",
      },
      {
        $match: {
          patient_id: objectIds(bookingId),
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$result.name" },
          phone: { $first: "$result.phone" },
          department: { $first: "$result.department" },
          status: { $first: "$status" },
        },
      },
    ])
    .then((data) => {
      console.log("aggre", data);
      return res.status(200).json({
        sucess: true,
        error: false,
        data: data,
      });
    });
 
});

module.exports = viewAppointments;
