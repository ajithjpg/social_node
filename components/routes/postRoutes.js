const express = require('express')
const router = express.Router({mergeParams:true})
const multer  = require('multer')


const storage = multer.diskStorage({

  destination:function(req,file,cb){
    cb(null,'./uploads/')
  },
  filename:function(req,file,cb){
    cb(null,file.originalname)
  }

})

const upload = multer({storage:storage})

router.get('/',async(req,res)=>{
res.send('post')
})


router.post('/upload',upload.single('post'), async(req,res,next) =>{

})

module.exports = router