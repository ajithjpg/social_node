const express = require('express')
const router = express.Router({ mergeParams: true })
const {getprofile,editprofile,updateProfile,updatefollow,updateUnfollow} = require('../controller/profilecontroller')


router.get('/:userId',getprofile);
router.get('/edit/:userId',editprofile);
router.post('/update/:id',updateProfile)
router.post('/follow/:userId/:follow_id',updatefollow);
router.post('/unfollow/:userId/:follow_id',updateUnfollow);
module.exports = router