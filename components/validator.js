
const jwt = require('jsonwebtoken')
require("dotenv").config()
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
  // console.log('mytokek:',token)
  if (token) {
    const onlyToken = token.slice(7, token.length);

    jwt.verify(onlyToken, process.env.JWT_SECRET_KEY, (err, decode) => {
      if (err) {

        return res.status(401).send({ message: 'Invalid Token' });
      }
      if (decode.exp < (new Date().getTime() + 1) / 1000) {
        return res.status(401).send({ message: 'Session expired' });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: 'Token is Missing' });
  }
};

module.exports.isAdmin = (req, res, next) => {
  // console.log(req.user);
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: 'Admin Token is not valid.' });
};

module.exports.isEmpty = (object) => {
  return Object.keys(object).length === 0
}


