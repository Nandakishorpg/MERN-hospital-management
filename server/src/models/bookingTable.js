const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://nandakishor:nandakishor@cluster0.tvvwvil.mongodb.net/hospitaldb?retryWrites=true&w=majority')
const Schema = mongoose.Schema
const bookingSchema=new Schema({
patient_id:{type:Schema.Types.ObjectId,ref:"patientregister_tb"},
doc_id:{type:Schema.Types.ObjectId,ref:"docregister_tb"},
status:{type:Number}

})
var bookingData=mongoose.model('bookingData_tb',bookingSchema)
module.exports=bookingData