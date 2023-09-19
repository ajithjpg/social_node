const express = require('express')
const router = express.Router({mergeParams:true})
const {sendmessage} = require('../controller/messagecontroller')
const {isAuth} = require('../validator')

router.get('/',async(req,res)=>{
res.send('messageRouter')
})

router.post('/sendMessage',sendmessage)

module.exports = router