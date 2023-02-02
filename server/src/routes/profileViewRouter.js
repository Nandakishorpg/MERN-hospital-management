const express = require("express");
const profileViewRouter = express.Router();
const profileView = require("../models/patientRegister");
const docProfileView = require("../models/docRegister");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/profilepic");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  },
});
var upload = multer({ storage: storage });

profileViewRouter.post('/docupdate',upload.single('file'),function(req,res){

console.log("Updata" + JSON.stringify(req.body))
console.log("ddddata" + JSON.stringify(req.body.name))
const id=req.body.loginid
console.log("id",id);

var updatedData={
  name:req.body.name,
  email:req.body.email,
  phone:req.body.phone,
  department:req.body.department,
  image:'profilepic/'+req.body.image
}
console.log('updatedData',updatedData);

docProfileView.updateOne({login_id:id},{ $set: { name: updatedData.name,email:updatedData.email,phone:updatedData.phone,department:updatedData.department,image:updatedData.image} }).then(()=>{
  return res.status(200).json({

    success:true,
    error:false,
    message:"profile Updated"
  })

})
})

profileViewRouter.post("/", function (req, res) {
  console.log("patientId", req.body.userId);
  const id = req.body.userId;
  console.log("pateint-id", id);
  profileView.findOne({ login_id: id }).then((data) => {
    console.log("datas", data);
    return res.status(200).json({
      success: true,
      error: false,
      data: data,
    });
  });
});

profileViewRouter.post("/docProfile", function (req, res) {
  console.log("userId", req.body.userId);
  const id = req.body.userId;
  console.log("User-id", id);
  docProfileView.findOne({ login_id: id }).then((data) => {
    console.log("datas", data);
    return res.status(200).json({
      success: true,
      error: false,
      data: data,
    });
  });
});

module.exports = profileViewRouter;
