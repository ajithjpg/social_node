
const { isEmpty } = require('../validator')

const {getprofiledetails} = require('../models/profileModel')

module.exports = {
    async getprofile(req,res){
        return res.status(200).send({
            code: 1,
            message: 'invalid credentials'
        })
    }
}