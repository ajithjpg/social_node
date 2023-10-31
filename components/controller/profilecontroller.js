
const { isEmpty } = require('../validator')

const { getprofiledetails, getpostdetails, checkuserId, getfollowers, getfollowing, updateProfile, updatefollow } = require('../models/profileModel')

module.exports = {
    async getprofile(req, res) {
        const user_id = await checkuserId(req.params.userId)
        if (user_id == 1) {
            const data = await getprofiledetails(req.params.userId);
            data['posts'] = await getpostdetails(req.params.userId);
            data['followers'] = await getfollowers(req.params.userId);
            data['following'] = await getfollowing(req.params.userId);
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