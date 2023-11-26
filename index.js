require("dotenv").config()
const express = require("express");
const userRoutes = require('./components/routes/UserRoutes')
const postRoutes = require('./components/routes/postRoutes')
const messageRouter = require('./components/routes/messageRoutes')
const ProfileRouter = require('./components/routes/profileRoutes')
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const {welcomeEmail} = require('./components/emailTemplate')
const corsOptions = {
  "origin": "*",
  optionsSuccessStatus: 200
}

const name = 'dillibabu'

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//routes

app.use('/users', userRoutes);
app.use('/posts',postRoutes);
app.use('/view_posts',postRoutes);
app.use('/message',messageRouter);
app.use('/getprofile',ProfileRouter);
app.use('/profile',ProfileRouter);
app.use('/editprofile',postRoutes);
app.use('/user', ProfileRouter);



const notfount = '404 Page Not Found'


app.get('/', (req, res) => {
  
  res.status(200)
  res.json('Sample Node API Version1');
})

app.get('/mail', (req, res) => {
  const output =  welcomeEmail('Dilli Babu','')
  
  const mailOptions = {
    from: 'ajithjerry@gmail.com',
    to: 'dillibabuelumalai24@gmail.com',
    subject: 'Verify your email address for photogrm.selfmade.lol',
    html:output
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
