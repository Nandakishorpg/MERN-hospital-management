const express=require("express");
const doctorViewRouter=express.Router();
const docView=require("../models/docRegister")

doctorViewRouter.get('/',function(req,res){
    // console.log("hiiii");
    docView.find().then((data) => {
        return res.status(200).json({
            success: true,
            error: false,
            data: data
        })

    })
})



module.exports=doctorViewRouter