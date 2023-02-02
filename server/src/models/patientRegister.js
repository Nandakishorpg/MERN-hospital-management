const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://nandakishor:nandakishor@cluster0.tvvwvil.mongodb.net/hospitaldb?retryWrites=true&w=majority')
const Schema = mongoose.Schema
const patientSchema = new Schema({
    login_id:{type:Schema.Types.ObjectId,ref:"login_tb"},
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    address:{type:String},
    image:{type:String}
   
})

var patientData = mongoose.model('patientRegister_tb', patientSchema)
module.exports = patientData