
const { isEmpty } = require('../validator')

const { getprofiledetails, getpostdetails, checkuserId, getfollowers, getfollowing, updateProfile } = require('../models/profileModel')

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
    }

}