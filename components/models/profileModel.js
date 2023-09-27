const sql = require("./db.js");


module.exports = {
    async getprofiledetails(id) {
        return new Promise((resolve, reject) => {
            sql.query(`SELECT * FROM photogram_profile WHERE  User_Id  = '${id}'`, (err, res) => {
                if (err) {
                    reject(err)
                } else {

                    resolve(res[0])
                }
            })
        })
    },
    async getpostdetails(id) {
        return new Promise((resolve, reject) => {
            sql.query(`SELECT post_id, post_text,post_date,img_url FROM photogrm_post WHERE user_id = '${id}' ORDER BY post_date DESC LIMIT 10 OFFSET 0`, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                  
                    resolve(res)
                }
            })
        })
    },
    async checkuserId(id) {

        return new Promise((resolve, reject) => {
            sql.query(`select * from photogrm_users WHERE Id = '${id}'`, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(res.length)

                    if (res.length == 1) {
                        resolve(1);
                    } else {
                        resolve(0);
                    }

                }
            })
        })

    },
    
    async getfollowers(id) {

        return new Promise((resolve, reject) => {
            sql.query(`select * from photogram_followers WHERE follower_id = '${id}'`, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                   
                    resolve(res.length);
                   
                }
            })
        })

    },
    async getfollowing(id) {

        return new Promise((resolve, reject) => {
            sql.query(`select * from photogram_followers WHERE following_id = '${id}'`, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.length);
                }
            })
        })

    },

    
}