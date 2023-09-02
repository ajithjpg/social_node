const express = require('express')
const router = express.Router({mergeParams:true})
const multer  = require('multer')
const upload = multer({ dest: '../../uploads/' })

router.get('/',async(req,res)=>{
res.send('post')
})
router.post('/file',async(req,res,next) =>{
    console.log(req)
})

module.exports = router