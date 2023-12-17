
const jwt = require('jsonwebtoken')
require("dotenv").config()
const UserModel = require('../components/models/UserModel');
//users.result.ID,users.result.Name, users.result.Email,users.result.PhoneNumber ,users.result.Password
module.exports.getToken = (id, name, email, phone) => {
  return jwt.sign(
    {
      _id: id,
      name: name,
      email: email,
      phone: phone,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '7d',
    }
  );
};

module.exports.isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);

    jwt.verify(onlyToken, process.env.JWT_SECRET_KEY, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      if (decode.exp < (new Date().getTime() + 1) / 1000) {
        return res.status(401).send({ message: 'Session expired' });
      }
      const check_token = (Token) => {
        return UserModel.getcurrentId(Token)
      }
      const check_token_status = check_token(onlyToken);
      check_token_status.then((data) => {
        console.log(data)
        if (data.length != 0) {
          console.log(data.response)
        } else {
          return res.status(401).send({ message: 'Session expired1' });
        }
      })

      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: 'Token is Missing' });
  }
};

module.exports.isAdmin = (req, res, next) => {

  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: 'Admin Token is not valid.' });
};

module.exports.isEmpty = (object) => {
  return Object.keys(object).length === 0
}


