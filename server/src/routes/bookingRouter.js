const express = require("express");
const bookingRouter = express.Router();
const booking = require("../models/bookingTable");

bookingRouter.post("/", function (req, res) {
  console.log("data",req.body);
  let bookingData={
    patient_id:req.body.patientId,
    doc_id:req.body.docId,
    status:0
  }
  let booking_item = booking(bookingData);
  booking_item.save().then(() => {
    res.status(200).json({
        success: true,
        error: false,
        message: "booked",
      });
    })

});
module.exports = bookingRouter;



