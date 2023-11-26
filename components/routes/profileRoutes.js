const express = require('express')
const router = express.Router({ mergeParams: true })
const {getprofile,editprofile,updateProfile,updatefollow,updateUnfollow} = require('../controller/profilecontroller')
var {isAuth} = require('../validator')

router.get('/:userId',isAuth,getprofile);
router.get('/edit/:userId',isAuth,editprofile);
router.post('/update/:id',isAuth,updateProfile)
router.post('/follow/:userId/:follow_id',isAuth,updatefollow);
router.post('/unfollow/:userId/:follow_id',isAuth,updateUnfollow);
module.exports = router