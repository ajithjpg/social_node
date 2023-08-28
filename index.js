require("dotenv").config()
const express = require("express");
const mysql = require('mysql');

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


// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'photogrm@proton.me',
//     pass: 'Dilli@123'
//   }
// });


const db = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,       //This is your localhost IP
  user: process.env.DB_USER,         // "newuser" created in Step 1(e)
  password: process.env.DB_PASSWORD,  // password for the new user
  database: process.env.DB_DATABASE,      // Database name
  port: process.env.DB_PORT             // port name, "3306" by default
})

db.getConnection( (err, connection)=> {   if (err) throw (err)
  console.log ("DB connected successful: " + connection.threadId)}
  )

//middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

//routes


// app.use('/project', project);
// app.use('/task', task);
// app.use('/users', users);






const notfount = '404 Page Not Found'


app.get('/', (req, res) => {
  
  res.status(200)
  res.json('Sample Node API Version1');
})

app.get('/mail', (req, res) => {
  
  const mailOptions = {
    from: 'photogrm@proton.me',
    to: 'dilli@trstscore.com ',
    subject: 'Test Email',
    text: 'Hello, this is a test email from Nodemailer.'
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

  
  // res.status(200)
  // res.send('Sample Node API Version1');
})

app.get('*', (req, res) => {
  res.status(404)
  res.send(`<center><h1> ${notfount}<h1></center>`);
});
// app.use(cors());







app.listen(process.env.PORT,() => {
  
  console.log(`app listening on port`);
});
