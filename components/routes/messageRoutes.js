const express = require('express')
const router = express.Router({mergeParams:true})
const { check_participant,getmessages,update_read,getchatlist} = require('../controller/messagecontroller')
const {isAuth} = require('../validator')

router.get('/:userId',isAuth,getmessages)
router.get('/chat/user_list',isAuth,getchatlist)

router.post('/send/:userId',isAuth,check_participant)

router.get('/update/:userId',isAuth,update_read)

module.exports = router