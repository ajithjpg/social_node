
const { isEmpty } = require('../validator')

const { getprofiledetails,getpostdetails,checkuserId,getfollowers,getfollowing } = require('../models/profileModel')

module.exports = {
    async getprofile(req, res) {
      const user_id = await checkuserId(req.params.userId)
        if(user_id == 1){
            const data = await getprofiledetails(req.params.userId);
            data['posts'] = await getpostdetails(req.params.userId);
            data['followers'] = await getfollowers(req.params.userId);
            data['following'] = await getfollowing(req.params.userId);
            return res.status(200).send({
                code: 0,
                message: "data",
                data:data
            })
        }else{
            return res.status(200).send({
                code: 1,
                message: "Invalid User ID",
            })
        }
       
        
    },
    async editprofile(req,res){
        return
    },
    async updateProfile(req,res){
        
    }

}