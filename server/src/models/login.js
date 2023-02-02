const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://nandakishor:nandakishor@cluster0.tvvwvil.mongodb.net/hospitaldb?retryWrites=true&w=majority')
const Schema = mongoose.Schema
const LoginSchema = new Schema({    
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, required: true }
})

var loginData = mongoose.model('login_tb', LoginSchema)
module.exports = loginData
