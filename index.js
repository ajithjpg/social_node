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
const { welcomeEmail } = require('./components/emailTemplate');
const { check_participants } = require('./components/controller/messagecontroller')
const { create_participant, checkparticipant, createMessage, upadte_read, getMessage, getchatListMessage } = require('./components/models/messageModel')

// const WebSocket = require('ws');



const corsOptions = {
  "origin": "*",
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Request-Method': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, GET',
  'Access-Control-Allow-Headers': '*',

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
app.use('/posts', postRoutes);
app.use('/view_posts', postRoutes);
app.use('/message', messageRouter);
app.use('/getprofile', ProfileRouter);
app.use('/profile', ProfileRouter);
app.use('/editprofile', postRoutes);
app.use('/user', ProfileRouter);



const notfount = '404 Page Not Found'


app.get('/', (req, res) => {

  res.status(200)
  res.json('Sample Node API Version1');
})

app.get('/mail', (req, res) => {
  const output = welcomeEmail('Dilli Babu', '')

  const mailOptions = {
    from: 'ajithjerry@gmail.com',
    to: 'dillibabuelumalai24@gmail.com',
    subject: 'Verify your email address for photogrm.selfmade.lol',
    html: output
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





const server = app.listen(process.env.PORT, () => {

  console.log(`app listening on port`);
});

// socketsetup
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
})






function onconnectSocket(socket) {
  // console.log(socket.handshake.query.token);
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id)
  });

  socket.on('send-message', (message) => {
    
    const createmessage = function (datas) {
      return createMessage(datas);
    }
    // console.log(message)
    if (message.conversation_id != 0) {

      const history = {
        'conversation_id': message.conversation_id,
        'sender_id': message.sender_id,
        'receiver_id': message.receiver_id,
        'message': message.message,
        'read': 0,
      }
      const createchat = createmessage(history)

      createchat.then(function(res){
        if(res.insertId !=0 && res.insertId != undefined){
          const senddata = {
            'conversation_id': res.insertId,
            'sender_id': message.sender_id,
            'receiver_id': message.receiver_id,
            'message': message.message,
            'read': 0,
            'date_on':message.date_on
          }
          console.log('1')
          socket.broadcast.emit('messages', senddata);
        }
        
      })

      
    } else {
      //check participant
      let checkpart = function () {
        return check_participants(message.sender_id, message.receiver_id).then(token => { return token })
      }
      let part_data = checkpart()
      //check participant

      //create participant
      let createpart = function (datas) {
        return create_participant(datas)
      }
      //create participant

      part_data.then(function (result) {
        if (result != 0) {
          const history = {
            'conversation_id': result,
            'sender_id': message.sender_id,
            'receiver_id': message.receiver_id,
            'message': message.message,
            'read': 0,
          }
          
          const createchat = createmessage(history)

          createchat.then(function(res){
            if(res.insertId !=0 && res.insertId != undefined){
              const senddata = {
                'conversation_id': res.insertId,
                'sender_id': message.sender_id,
                'receiver_id': message.receiver_id,
                'message': message.message,
                'read': 0,
                'date_on':message.date_on
              }
              console.log('2')
              socket.emit('messages', senddata);
            }
          })
        } else {
          var datas = {
            "user1_id": message.sender_id,
            "user2_id": message.receiver_id
          }
          let create = createpart(datas)
          create.then(function (result) {
            if (result.insertId != 0 && insertId != undefined) {
              const history = {
                'conversation_id': result.insertId,
                'sender_id': message.sender_id,
                'receiver_id': message.receiver_id,
                'message': message.message,
                'read':0,
              }
              const createchat = createmessage(history)

              createchat.then(function(res){
                if(res.insertId !=0 && res.insertId != undefined){
                  const senddata = {
                    'conversation_id': res.insertId,
                    'sender_id': message.sender_id,
                    'receiver_id': message.receiver_id,
                    'message': message.message,
                    'read': 0,
                    'date_on':message.date_on
                  }
                  console.log('3')
                  socket.broadcast.emit('messages', senddata);
                }
              })
            }
          })
        }

      })
    }

  });

  socket.on('typing', (message) => {
    socket.broadcast.emit('typing', message)
  });
}

//  io.use(function(socket, next){
//   if (socket.handshake.query && socket.handshake.query.token){
//     jwt.verify(socket.handshake.query.token, 'SECRET_KEY', function(err, decoded) {
//       if (err) return next(new Error('Authentication error'));
//       socket.decoded = decoded;
//       next();
//     });
//   }
//   else {
//     next(new Error('Authentication error'));
//   }    
// })

io.on('connection', onconnectSocket)




// socketsetup