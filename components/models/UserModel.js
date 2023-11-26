const sql = require("./db.js");

module.exports.findByemail = (email) => {
  //0 - ERR , 1 - FOUND , 2 - NOT FOUND
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM photogrm_users WHERE Email ='${email}'`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length);
      }
    });
  });
}

module.exports.create = (newUser) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO photogrm_users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        reject(err);
      } else {
        response = {
          "Id": res.insertId,
          "status": 1
        }
        resolve(response);
      }
    });
  })

}
module.exports.update = (id) => {
  return new Promise((resolve, reject) => {
    sql.query(`UPDATE photogrm_users SET IsVerify = 1 WHERE id = '${id}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        // result(err, null);
        reject(err);
      } else {

        resolve(1);
      }
    });
  })

}
module.exports.signByemail = (email) => {
  //0 - ERR , 1 - FOUND , 2 - NOT FOUND
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM photogrm_users WHERE Email ='${email}'`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        if (results.length == 0) {
          var res = {
            status: false,
            result: []
          }

        } else {
          var res = {
            status: true,
            result: results[0]
          }
        }
        resolve(res);

      }
    });
  });
}
module.exports.createSession = (User) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO photogrm_user_session SET ?", User, (err, res) => {
      if (err) {
        console.log("error: ", err);
        // result(err, null);
        reject(err);
      } else {
        response = 1
        resolve(response);
      }
    });
  })

}
module.exports.checkuserId = (id) => {

  return new Promise((resolve, reject) => {
    sql.query(`select * from photogrm_users WHERE Id = '${id}'`, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log(res.length)

        if (res.length == 1) {
          response = {
            "access": 1,
            "response": res[0]
          }

        } else {
          response = {
            "access": 0,
            "response": []
          }

        }
        resolve(response);

      }
    })
  })

}

module.exports.createprofile = (data) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO photogram_profile SET ?", data, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(1)
      }
    })
  })
}

module.exports.getcurrentId = (token) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM photogrm_user_session WHERE token = '${token}'`, (err, res) => {
      if (err) {
        reject(err)
      }else{
        
        resolve(res)
      }
    })
  })

}