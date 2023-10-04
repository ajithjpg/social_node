const express = require('express')
const router = express.Router({ mergeParams: true })
const {getprofile,editprofile,updateProfile} = require('../controller/profilecontroller')


router.get('/:userId',getprofile);
router.get('/edit/:userId',editprofile);
router.post('/update/:id',updateProfile)

module.exports = router