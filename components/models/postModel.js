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
    },

    async getpost(userid) {
        return new Promise((resolve, reject) => {
            // sql.query(`SELECT * FROM  photogrm_post WHERE user_id ='${userid}' UNION ALL
            // SELECT *
            // FROM photogrm_post
            // WHERE user_id IN (
            //     SELECT following_id
            //     FROM photogram_followers
            //     WHERE follower_id = '${userid}'
            // )`, (err, res) => {
            //     if (err) {
            //         reject(err)
            //     } else {
            //         console.log(res)
            //         resolve(res)
            //     }
            // })

            sql.query(`SELECT photogrm_post.*,
            photogram_profile.full_name AS user_full_name,
            photogram_profile.profile_picture_url AS user_profile_image_url,
            COUNT(DISTINCT post_likes.like_id) AS likes,
            GROUP_CONCAT(DISTINCT post_comments.comment_text ORDER BY post_comments.comment_date ASC SEPARATOR '|') AS comments
            FROM photogrm_post

            LEFT JOIN post_likes ON photogrm_post.post_id = post_likes.post_id
            LEFT JOIN post_comments ON photogrm_post.post_id = post_comments.post_id
            INNER JOIN photogram_profile ON photogrm_post.user_id = photogram_profile.user_id
            WHERE photogrm_post.user_id = '${userid}'

                OR photogrm_post.user_id IN (
                SELECT following_id FROM photogram_followers
                WHERE follower_id = '${userid}'
                )
            GROUP BY photogrm_post.post_id
            ORDER BY photogrm_post.post_date DESC`, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    },


}