const express = require("express");
const mysql = require('mysql');

const app = express();

const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const corsOptions = {
  "origin": "*",
  optionsSuccessStatus: 200
}

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
  res.send('Sample Node API Version1');
})

app.get('*', (req, res) => {
  res.status(404)
  res.send(`<center><h1> ${notfount}<h1></center>`);
});
// app.use(cors());


const port = 3000;
const hostname = '127.0.0.1';
//const port = 3000;




app.listen(port,() => {
  
  console.log(`app listening on port`);
});
