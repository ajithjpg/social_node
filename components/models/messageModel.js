const sql = require("./db.js");
require("dotenv").config()
module.exports = {

    async create_participant(datas) {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO user_conversation SET ?", datas, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    },

    async checkparticipant(SenderID, ReceiverID) {
        return new Promise((resolve, reject) => {
            sql.query(`SELECT * FROM user_conversation WHERE user1_id ='${SenderID}' AND user2_id = '${ReceiverID}' OR user1_id ='${ReceiverID}' AND user2_id = '${SenderID}'`, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    },

    async createMessage(msgdata) {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO message_history SET ?", msgdata, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    // result(err, null);
                    reject(err);
                } else {

                    resolve(res);
                }
            });
        })
    },

    async getMessage(conversation_id) {

        return new Promise((resolve, reject) => {
            sql.query(`SELECT message_history.*,
            photogram_profile.full_name AS user_full_name,
            photogram_profile.profile_picture_url AS user_profile_image_url
            FROM message_history 
            INNER JOIN photogram_profile ON message_history.sender_id  = photogram_profile.user_id 
            WHERE message_history.conversation_id = '${conversation_id}'`, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    // result(err, null);
                    reject(err);
                } else {
                    console.log(res.length)
                    resolve(res);
                }
            });
        })
    },

    async upadte_read(id) {
        new Promise((resolve, reject) => {
            sql.query(`UPDATE message_history SET read  = 1 WHERE conversation_id = '${id}'`, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(1)
                }
            })
        })

    },

    async getchatListMessage(ID) {

        return new Promise((resolve, reject) => {
            sql.query(`SELECT * FROM user_conversation  WHERE user1_id = '${ID}' OR user2_id = '${ID}'`, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    // result(err, null);
                    reject(err);
                } else {
                    console.log(res.length+'ssss')
                    resolve(res);
                }
            });
        })
    },

}