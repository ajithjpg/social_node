const { create_participant, checkparticipant, createMessage, upadte_read, getMessage, getchatListMessage } = require('../models/messageModel')
const { checkuserId, getprofile_img } = require("../models/profileModel")
const { getcurrentId } = require('../models/UserModel')



module.exports = {
    
    async check_participant(req, response) {

        if (req.body.message != '') {

            const recei_id = await checkuserId(req.params.userId)
            if (recei_id == 1) {
                const token = req.headers.authorization;

                if (token) {
                    const onlyToken = token.slice(7, token.length);
                    const res = await getcurrentId(onlyToken)

                    if (res[0]['user_id'] != 0) {
                        const data = await checkparticipant(res[0]['user_id'], req.params.userId);

                        var create = 0
                        var insert_id = 0
                        if (data.length != 0) {
                            insert_id = data[0]['conversation_id']
                            create = 1;
                        } else {
                            var datas = {
                                "user1_id": res[0]['user_id'],
                                "user2_id": req.params.userId
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
                                'sender_id': res[0]['user_id'],
                                'receiver_id': req.params.userId,
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
                return response.send({
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

                if (token) {
                    const onlyToken = token.slice(7, token.length);
                    const geduserid = await getcurrentId(onlyToken);
                   var user_data =  await getprofile_img(req.params.userId);
                    if (geduserid[0]['user_id'] != 0) {
                        const data = await checkparticipant(req.params.userId, geduserid[0]['user_id']);


                        if (data.length != 0) {
                            const insert_id = data[0]['conversation_id'];

                            const datas = await getMessage(insert_id)

                            return res.send({
                                'code': 0,
                                "data": datas,
                                "profile_img":user_data[0]['profile_picture_url'],
                                "profile_name":user_data[0]['full_name']
                            })

                        } else {
                            return res.send({
                                'code': 0,
                                "data": [],
                                "profile_img":user_data[0]['profile_picture_url'],
                                "profile_name":user_data[0]['full_name']
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

    async getchathistory(req, res) {
        const datas = await getMessage(req.params.userId)
        const user_profile = '';
        const user_name = '';
        const profile_id = '0';
        if (res.length != 0) {

            const token = req.headers.authorization;

            if (token) {
                const onlyToken = token.slice(7, token.length);
                const geduserid = await getcurrentId(onlyToken)
                if (datas[0]['sender_id'] != geduserid[0]['user_id']) {
                    const profile_id = datas[0]['sender_id'];
                } else if (data[0]['receiver_id'] != geduserid[0]['user_id']) {
                    const profile_id = datas[0]['receiver_id'];
                }

                if (profile_id != '0') {
                    const data = await getprofile_img(profile_id);
                    user_profile = data[0]['profile_picture_url'];
                    user_name = data[0]['full_name'];
                }
                return res.send({
                    'code': 0,
                    "data": datas,
                    "user_name": user_name,
                    "user_profile": user_profile

                })
            }
        } else {
            return res.send({
                'code': 0,
                "data": []
            })
        }


    },

    async update_read(req, res) {
        if (req.params.userId != 0) {
            const status = await checkuserId(req.params.userId)
            if (status == 1) {
                const token = req.headers.authorization;

                if (token) {
                    const onlyToken = token.slice(7, token.length);
                    const geduserid = await getcurrentId(onlyToken)

                    if (geduserid[0]['user_id'] != 0) {
                        const data = await checkparticipant(geduserid[0]['user_id'], req.params.userId);


                        if (data.length != 0) {
                            const insert_id = data[0]['conversation_id'];

                            const datas = await upadte_read(insert_id)

                            if (datas == 1) {
                                return res.send({
                                    'code': 0,
                                    "data": datas
                                })
                            } else {
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
    },

    async getchatlist(req, res) {



        const token = req.headers.authorization;

        if (token) {
            const onlyToken = token.slice(7, token.length);
            const geduserid = await getcurrentId(onlyToken)

            if (geduserid[0]['user_id'] != 0) {
                const data = await getchatListMessage(geduserid[0]['user_id']);
                if (data.length != 0) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i]['user1_id'] != geduserid[0]['user_id']) {
                            const datas = await getprofile_img(data[i]['user1_id']);
                            data[i]['user_profile'] = datas[0]['profile_picture_url'];
                            data[i]['name'] = datas[0]['full_name'];
                        } else if (data[i]['user2_id'] != geduserid[0]['user_id']) {
                            const datas = await getprofile_img(data[i]['user2_id']);
                            data[i]['user_profile'] = datas[0]['profile_picture_url'];
                            data[i]['name'] = datas[0]['full_name'];
                        }
                    }

                    return res.send({
                        'code': 0,
                        "data": data
                    })



                } else {
                    return res.send({
                        'code': 1,
                        "data": []
                    })
                }
            }
        }
    },

    async check_participants(sender_id,recei_id) {
        const data = await checkparticipant(sender_id, recei_id); 
        if(data.length !=0){
            return data[0]['conversation_id'];
        }else{
            return 0;
        }
    },

}



