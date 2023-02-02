const express = require('express');
const loginRouter = require('./src/routes/loginRouter');
const app = express()

const registerRouter=require('./src/routes/registerRouter')
const profileViewRouter=require('./src/routes/profileViewRouter')
const doctorViewRouter=require('./src/routes/doctorViewRouter')
const bookingRouter=require('./src/routes/bookingRouter')
const viewAppointments=require('./src/routes/viewAppointments')

app.use(express.json())


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
  
  app.use(express.urlencoded({ extended: true }))

  app.use('/register',registerRouter)
  app.use('/login',loginRouter)
  app.use('/profile',profileViewRouter)
  app.use('/docView',doctorViewRouter)
  app.use('/booking',bookingRouter)
  app.use('/viewAppointments',viewAppointments)

  app.listen(2000, () => {
    console.log('server started at port 2000')
  })