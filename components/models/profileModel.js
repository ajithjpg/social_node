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

    async check_follow(id, current_user_id) {
        return new Promise((resolve, reject) => {
            sql.query(`SELECT * FROM photogram_followers WHERE follower_id = '${id}' AND following_id = '${current_user_id}'`, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res.length)
            })
        })
    },

    async check_following(id, current_user_id) {
        return new Promise((resolve, reject) => {
            sql.query(`SELECT * FROM photogram_followers WHERE following_id = '${id}'  AND follower_id = '${current_user_id}'`, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res.length)
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

    async updateProfile(data, id) {
        return new Promise((resolve, reject) => {
            sql.query(`UPDATE photogram_profile SET profile_picture_url = '${data.image_url}',bio ='${data.bio}',full_name = '${data.Name}',username='${data.username}'  WHERE User_Id = '${id}'`, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(1)
                }
            })
        })
    },

    async updatefollow(data) {
        return new Promise((resolve, reject) => {
            sql.query(`Insert into photogram_followers SET ?`, data, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(1)
                }
            })
        })
    },

    async updateUnfollow(following_id, follow_id) {
        return new Promise((resolve, reject) => {
            sql.query(`DELETE FROM photogram_followers WHERE following_id = '${following_id}'  AND follower_id = '${follow_id}'`, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(1)
                }
            })
        })
    },
    async checkfollow(datas) {
        return new Promise((resolve, reject) => {
            sql.query(`SELECT * FROM photogram_followers WHERE following_id = '${datas.following_id}'  AND follower_id = '${datas.follower_id}'`,(err,res)=>{
                if(err){
                    reject(err)
                }
                resolve(res.length)
            })
        })
    },

    async getcurrentuserid(token) {

        const onlyToken = token.slice(7, token.length);

        return new Promise((resolve, reject) => {
            sql.query(`SELECT * FROM photogrm_user_session WHERE token = '${onlyToken}' `, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    }


}