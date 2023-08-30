require("dotenv").config()
const express = require("express");

// const validate = require('./components/validator')
// import { isAuth, getToken } from './components/validator';
const userRoutes = require('./components/routes/UserRoutes')
// import productRoute from './serverside/routes/productroute'
// import orderRoute from './serverside/routes/orderRoute'
// import uploadRoute from './serverside/routes/uploadRoute'
// const mysql = require('mysql');

const app = express();

const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const corsOptions = {
  "origin": "*",
  optionsSuccessStatus: 200
}


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'ajithjerry@gmail.com',
    pass: 'xrntjsjgmkqewqia'
  }
});




// db.getConnection( (err, connection)=> {   if (err) throw (err)
//   console.log ("DB connected successful: " + connection.threadId)}
// )

//middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

//routes


// app.use('/project', project);
// app.use('/task', task);
app.use('/users', userRoutes);




const notfount = '404 Page Not Found'


app.get('/', (req, res) => {
  
  res.status(200)
  res.json('Sample Node API Version1');
})

app.get('/mail', (req, res) => {
  
  const mailOptions = {
    from: 'ajithjerry@gmail.com',
    to: 'shankarpopz31102000@gmail.com',
    subject: 'Test Email',
    text: 'Hello, this is a test email from Nodemailer.'
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      res.status(200)
     res.json(error);
    } else {
      console.log('Email sent:', info.response);
      res.status(200)
     res.json(info.response);
    }
  });

  
  // res.status(200)
  // res.send('Sample Node API Version1');
})

app.get('*', (req, res) => {
  res.status(404).json(`${notfount}`);
});
// app.use(cors());







app.listen(process.env.PORT,() => {
  
  console.log(`app listening on port`);
});
