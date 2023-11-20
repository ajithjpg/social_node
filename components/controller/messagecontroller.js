const { create_participant, checkparticipant, createMessage,upadte_read, getMessage } = require('../models/messageModel')
const { checkuserId } = require("../models/profileModel")
const { getcurrentId } = require('../models/UserModel')



module.exports = {

    async check_participant(req, response) {

        if (req.body.message != '') {

            const sender_id = await checkuserId(req.params.userId)
            if (sender_id == 1) {
                const token = req.headers.authorization;
                // console.log('mytokek:',token)
                if (token) {
                    const onlyToken = token.slice(7, token.length);
                    const res = await getcurrentId(onlyToken)

                    if (res[0]['user_id'] != 0) {
                        const data = await checkparticipant(req.params.userId, res[0]['user_id']);
                        console.log(data)
                        var create = 0
                        var insert_id = 0
                        if (data.length != 0) {
                            insert_id = data[0]['conversation_id']
                            create = 1;
                        } else {
                            var datas = {
                                "user1_id": req.params.userId,
                                "user2_id": res[0]['user_id']
                            }

                            const status = await create_participant(datas)

                            if (status.insertId != 0 && status.insertId != undefined) {
                                create = 1;
                                insert_id = status.insertId
                            }
                        }

                        if (create == 1) {
                            const datas = {
                                'conversation_id': insert_id,
                                'sender_id': req.params.userId,
                                'receiver_id': res[0]['user_id'],
                                'message': req.body.message,
                                'read': 0,
                            }

                            const data = await createMessage(datas);

                            if (data == 1) {
                                return response.send({
                                    'code': 0,
                                    "message": "Message Send Successfully"
                                })
                            } else {
                                return response.send({
                                    'code': 1,
                                    "message": "Something Went Wrong"
                                })
                            }

                        }

                    }
                }

            } else {
                return res.send({
                    'code': 1,
                    "message": "Something Went Wrong"
                })
            }

        } else {
            return response.send({
                'code': 1,
                "message": "Something Went Wrong"
            })
        }
    },

    async getmessages(req, res) {
        if (req.params.userId != 0) {
            const status = await checkuserId(req.params.userId)
            if (status == 1) {
                const token = req.headers.authorization;
                // console.log('mytokek:',token)
                if (token) {
                    const onlyToken = token.slice(7, token.length);
                    const geduserid = await getcurrentId(onlyToken)

                    if (geduserid[0]['user_id'] != 0) {
                        const data = await checkparticipant(req.params.userId, geduserid[0]['user_id']);
                       
                        
                        if (data.length != 0) {
                            const insert_id = data[0]['conversation_id'];

                            const datas = await getMessage(insert_id)
                            console.log(datas)
                            return res.send({
                                'code': 1,
                                "data": datas
                            })
                            
                        } else {
                            return res.send({
                                'code': 1,
                                "data": []
                            })
                        }
                    }
                }
            } else {
                return res.send({
                    'code': 1,
                    "message": "Something Went Wrong"
                })
            }

        } else {
            return response.send({
                'code': 1,
                "message": "Something Went Wrong"
            })
        }
    },

    async update_read(req,res){
        if(req.params.userId !=0){
            const status = await checkuserId(req.params.userId)
            if (status == 1) {
                const token = req.headers.authorization;
                // console.log('mytokek:',token)
                if (token) {
                    const onlyToken = token.slice(7, token.length);
                    const geduserid = await getcurrentId(onlyToken)

                    if (geduserid[0]['user_id'] != 0) {
                        const data = await checkparticipant(req.params.userId, geduserid[0]['user_id']);
                       
                        
                        if (data.length != 0) {
                            const insert_id = data[0]['conversation_id'];

                            const datas = await upadte_read(insert_id)
                            
                            if(datas == 1){
                                return res.send({
                                    'code': 0,
                                    "data": datas
                                })
                            }else{
                                return res.send({
                                    'code': 1,
                                    "data": datas
                                })
                            }
                           
                            
                        } else {
                            return res.send({
                                'code': 1,
                                "data": []
                            })
                        }
                    }
                }
            } 
        }
    }



}



