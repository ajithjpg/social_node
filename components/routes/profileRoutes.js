const express = require('express')
const router = express.Router({ mergeParams: true })
const {getprofile,editprofile,updateProfile} = require('../controller/profilecontroller')


router.get('/:userId',getprofile);
router.get('/edit',editprofile);
router.put('/update',updateProfile)

module.exports = router