
const { isEmpty } = require('../validator')

const { getprofiledetails,checkfollow,updateUnfollow, getpostdetails, checkuserId, getfollowers,check_following, getfollowing,check_follow,getcurrentuserid, updateProfile, updatefollow } = require('../models/profileModel')

module.exports = {
    async getprofile(req, res) {
        const user_id = await checkuserId(req.params.userId)
        const current_user_id = await getcurrentuserid(req.headers.authorization)
       
        
        if (user_id == 1) {
            const data = await getprofiledetails(req.params.userId);
            
            data['posts'] = await getpostdetails(req.params.userId);
            data['followers'] = await getfollowers(req.params.userId);
            data['following'] = await getfollowing(req.params.userId);
          
           
            data['isfollow'] = await check_follow(req.params.userId,current_user_id[0]['user_id']);
            data['isfollowing'] = await check_following(req.params.userId,current_user_id[0]['user_id'])
          
            return res.status(200).send({
                code: 0,
                message: "data",
                data: data
            })
        } else {
            return res.status(200).send({
                code: 1,
                message: "Invalid User ID",
            })
        }


    },
    async editprofile(req, res) {
        const data = await getprofiledetails(req.params.userId);

        var datas = {
            "Id": data['Id'],
            "username": data['username'],
            "full_name": data['full_name'],
            "bio": data['bio'],
            "profile_picture_url": data['profile_picture_url'],
        }
        return res.status(200).send({
            code: 0,
            message: "data",
            data: datas
        })
    },
    async updateProfile(req, res) {

        if (req.params.Id != 0) {
            const data = await checkuserId(req.params.id)
            if (data == 1) {


                if (req.body.bio != '' && req.body.username != '' && req.body.Name != '' && req.body.image_url != '') {

                    var datas = {}
                    datas['bio'] = req.body.bio;
                    datas['username'] = req.body.username;
                    datas['Name'] = req.body.Name;
                    datas['image_url'] = req.body.image_url;
                    var update = await updateProfile(datas, req.params.id)

                    if (update == 1) {
                        return res.send({
                            'code': 0,
                            "message": "Profile Updated Successfully"
                        })
                    } else {
                        return res.send({
                            'code': 1,
                            "message": "some thing went wrong"
                        })
                    }
                } else {
                    return res.send({
                        'code': 1,
                        "message": "some thing went wrong"
                    })
                }


            } else {
                return res.send({
                    'code': 1,
                    "message": "Invalid User Id"
                })
            }
        } else {
            return res.send({
                'code': 1,
                "message": "some thing went wrong"
            })
        }
    },
    async updatefollow(req, res) {
        if (req.params.userId != req.params.follow_id) {
            if (req.params.userId != 0 && req.params.follow_id != 0) {
                const data = await checkuserId(req.params.userId)
                if (data == 1) {
                    const followdata = await checkuserId(req.params.follow_id)
                    if (followdata == 1) {
                        var datas = {
                            'follower_id': req.params.follow_id,
                            'following_id': req.params.userId,

                        }
                        var status = await checkfollow(datas)
                       
                        if(status == 0){
                            var update = await updatefollow(datas)

                            if (update == 1) {
                                return res.send({
                                    'code': 0,
                                    "message": "following successfully"
                                })
                            } else {
                                return res.send({
                                    'code': 1,
                                    "message": "Invalid User Id3"
                                })
                            }
                        }else{
                            return res.send({
                                'code': 1,
                                "message": "already following"
                            })
                        }
                        
                    } else {
                        return res.send({
                            'code': 1,
                            "message": "Invalid User Id1"
                        })
                    }
                } else {
                    return res.send({
                        'code': 1,
                        "message": "Invalid User Id2"
                    })
                }
            } else {

            }
        } else {
            return res.send({
                'code': 1,
                "message": "SomeThing Went Wrong"
            })
        }

    },
    async updateUnfollow(req, res) {
        if (req.params.userId != req.params.follow_id) {
            if (req.params.userId != 0 && req.params.follow_id != 0) {
                const data = await checkuserId(req.params.userId)
                if (data == 1) {
                    const followdata = await checkuserId(req.params.follow_id)
                    if (followdata == 1) {
                        var datas = {
                            'follower_id': req.params.follow_id,
                            'following_id': req.params.userId,

                        }
                        var status = await checkfollow(datas)
                        if(status == 1){
                            var update = await updateUnfollow(req.params.userId,req.params.follow_id,)

                            if (update == 1) {
                                return res.send({
                                    'code': 0,
                                    "message": "Unfollowing successfully"
                                })
                            } else {
                                return res.send({
                                    'code': 1,
                                    "message": "Invalid User Id3"
                                })
                            }
                        }else{
                            return res.send({
                                'code': 1,
                                "message": "Something Went Wrong"
                            })
                        }
                        
                    } else {
                        return res.send({
                            'code': 1,
                            "message": "Invalid User Id1"
                        })
                    }
                } else {
                    return res.send({
                        'code': 1,
                        "message": "Invalid User Id2"
                    })
                }
            } else {

            }
        } else {
            return res.send({
                'code': 1,
                "message": "SomeThing Went Wrong"
            })
        }

    }
}