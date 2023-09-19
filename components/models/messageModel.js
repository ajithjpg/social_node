const { response } = require("express");
const sql = require("./db.js");

module.exports = {
    async create(msgdata) {
        console.log(msgdata)
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO chat SET ?", msgdata, (err, res) => {
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
}