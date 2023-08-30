const sql = require("./db.js");

module.exports.findByemail = (email) => {
  //0 - ERR , 1 - FOUND , 2 - NOT FOUND
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM users WHERE Email ='${email}'`, (err, results) => {
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
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        // result(err, null);
        reject(err);
      } else {
          response ={
            "Id":res.insertId,
            "status":1
          }
        resolve(response);
      }
    });
  })

}
module.exports.update = (id) => {
  return new Promise((resolve, reject) => {
    sql.query(`UPDATE users SET IsVerify = 1 WHERE id = '${id}'`, (err, res) => {
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
// constructor
// const Tutorial = function(tutorial) {
//   this.title = tutorial.title;
//   this.description = tutorial.description;
//   this.published = tutorial.published;
// };

// Tutorial.create = (newTutorial, result) => {
//   sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
//     result(null, { id: res.insertId, ...newTutorial });
//   });
// };

// Tutorial.findById = (id, result) => {
//   sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found tutorial: ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     // not found Tutorial with the id
//     result({ kind: "not_found" }, null);
//   });
// };

// Tutorial.findByemail = (email) =>{
//   console.log('sss')
//   sql.query(`SELECT * FROM users WHERE email = ${email}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found tutorial: ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     // not found Tutorial with the id
//     result({ kind: "not_found" }, null);
//   });
// }

// Tutorial.getAll = (title, result) => {
//   let query = "SELECT * FROM tutorials";

//   if (title) {
//     query += ` WHERE title LIKE '%${title}%'`;
//   }

//   sql.query(query, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("tutorials: ", res);
//     result(null, res);
//   });
// };

// Tutorial.getAllPublished = result => {
//   sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("tutorials: ", res);
//     result(null, res);
//   });
// };

// Tutorial.updateById = (id, tutorial, result) => {
//   sql.query(
//     "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
//     [tutorial.title, tutorial.description, tutorial.published, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Tutorial with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated tutorial: ", { id: id, ...tutorial });
//       result(null, { id: id, ...tutorial });
//     }
//   );
// };

// Tutorial.remove = (id, result) => {
//   sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found Tutorial with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("deleted tutorial with id: ", id);
//     result(null, res);
//   });
// };

// Tutorial.removeAll = result => {
//   sql.query("DELETE FROM tutorials", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} tutorials`);
//     result(null, res);
//   });
// };

// module.exports = Tutorial;