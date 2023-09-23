const { response } = require("express");
const sql = require("./db.js");
const { update } = require("./UserModel.js");


module.exports = {
    async createpost(datas) {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO photogrm_post SET ?", datas, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(1);
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

    async checkPost(id) {
        return new Promise((resolve, reject) => {
            sql.query(`select * from photogrm_post WHERE post_id = '${id}'`, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    if (res.length == 1) {
                        resolve(1)
                    } else {
                        resolve(0)
                    }

                }
            })
        })
    },

    async addlike(datas) {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO post_likes  SET ?", datas, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(1);
                }
            })
        })
    },

    async updatelike(postid, userid, sts, date) {
        return new Promise((resolve, reject) => {
            sql.query(`UPDATE post_likes SET isLike = '${sts}',like_date = '${date}' WHERE post_id = '${postid}' && user_id = '${userid}'`, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    // result(err, null);
                    reject(err);
                } else {

                    resolve(1);
                }
            });
        })
    },

    async checkuserlike(postid, userid) {
        return new Promise((resolve, reject) => {
            sql.query(`SELECT * FROM  post_likes WHERE post_id ='${postid}' && user_id = '${userid}'`, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res.length)
                }
            })
        })
    },
    async addcommend(datas) {
        return new Promise((resolve, reject) => {
            sql.query('INSERT INTO post_comments SET ?', datas, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(1)
                }
            })
        })
    }

}