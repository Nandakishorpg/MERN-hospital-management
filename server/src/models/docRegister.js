const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://nandakishor:nandakishor@cluster0.tvvwvil.mongodb.net/hospitaldb?retryWrites=true&w=majority')
const Schema = mongoose.Schema
const DocSchema = new Schema({
    login_id:{type:Schema.Types.ObjectId,ref:"login_tb"},
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    qualification:{type: String},
    department:{type:String},
    image:{type:String}
   
})

var userData = mongoose.model('docRegister_tb', DocSchema)
module.exports = userData