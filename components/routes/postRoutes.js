const express = require('express')
const router = express.Router({ mergeParams: true })
const multer = require('multer')
var MD5 = require("crypto-js/md5");
const { checkuserId, createpost, checkPost, addlike, updatelike, checkuserlike, addcommend, getpost, explorepost, viewpost,getcomments,checkfollow } = require('../models/postModel')
var path = require('path');
var {isAuth} = require('../validator')
var fs = require('fs');
require("dotenv").config()

// console.log(MD5("Message").toString());

const date = require('date-and-time');

// console.log(date.format(new Date(), 'YYYY/MM/DD HH:mm:ss'))
function getExtension(filename) {
  return filename.split('.').pop();
}

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, process.env.upload_path )
  },
  filename: function (req, file, cb) {
    cb(null, MD5(date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')).toString() + '.' + getExtension(file.originalname))
    filename = MD5(date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')).toString() + '.' + getExtension(file.originalname)
  }

})

const upload = multer({ storage: storage })

// upload.single('file'),

router.post('/upload',isAuth,upload.single('file'), async (req, res, next) => {

  if (req.body.user_id != 0 && req.body.post_text != '') {

    
    const data = await checkuserId(req.body.user_id)
    console.log(req.body)

    if (data == 1) {
//req.body.file      'http://localhost:8080/posts/images/' + filename
      var datas = {
        "user_id": req.body.user_id,
        "post_text": req.body.post_text,
        "img_url": process.env.client_url+'posts/images/' + filename,
      }

      const result = await createpost(datas);
     
      if (result == 1) {
        return res.send({
          'code': 0,
          "message": "post Added Successfully"
        })
      } else {
        return res.send({
          'code': 1,
          "message": "some thing went wrong"
        })
      }
    } else {
      return res.send({
        'code': 1,
        "message": "Invalid User Id"
      })
    }



  } else {
    return res.send({
      'code': 1,
      "message": "some thing went wrong"
    })
  }

})

router.post('/like/:post_id/:user_id',isAuth, async (req, res, next) => {


  const status = await checkPost(req.params.post_id);
  if (status == 1) {
    const usersts = await checkuserId(req.params.user_id)
    if (usersts == 1) {

      const likests = await checkuserlike(req.params.post_id, req.params.user_id);

      if (likests == 0) {
        var datas = {
          "user_id": req.params.user_id,
          "post_id": req.params.post_id,
          "isLike": 1,
          "like_date": new Date(),
        }

        var sts = await addlike(datas)
        if (sts == 1) {
          return res.send({
            'code': 0,
            "message": "liked successfully"
          })
        } else {
          return res.send({
            'code': 1,
            "message": "something went wrong"
          })
        }
      } else {
        var sts = await updatelike(req.params.post_id, req.params.user_id, 1, new Date())
        if (sts == 1) {
          return res.send({
            'code': 0,
            "message": "liked successfully"
          })
        } else {
          return res.send({
            'code': 1,
            "message": "something went wrong"
          })
        }
      }

    } else {
      return res.send({
        'code': 1,
        "message": "Invalid User Id"
      })
    }

  } else {
    return res.send({
      'code': 1,
      "message": "Invalid Post Id"
    })
  }

})

router.post('/dislike/:post_id/:user_id',isAuth, async (req, res, next) => {


  const status = await checkPost(req.params.post_id);
  if (status == 1) {
    const usersts = await checkuserId(req.params.user_id)
    if (usersts == 1) {

      const likests = await checkuserlike(req.params.post_id, req.params.user_id);

      if (likests == 0) {
        return res.send({
          'code': 1,
          "message": "something went wrong"
        })
      } else {
        var sts = await updatelike(req.params.post_id, req.params.user_id, 0, new Date())
        if (sts == 1) {
          return res.send({
            'code': 0,
            "message": "disliked successfully"
          })
        } else {
          return res.send({
            'code': 1,
            "message": "something went wrong"
          })
        }
      }

    } else {
      return res.send({
        'code': 1,
        "message": "Invalid User Id"
      })
    }

  } else {
    return res.send({
      'code': 1,
      "message": "Invalid Post Id"
    })
  }
})

router.post('/commend/:post_id/:user_id',isAuth, async (req, res, next) => {
  if (req.body.comment_text != '') {
    const status = await checkPost(req.params.post_id);
    if (status == 1) {
      const usersts = await checkuserId(req.params.user_id)
      if (usersts == 1) {
        var datas = {
          "user_id": req.params.user_id,
          "post_id": req.params.post_id,
          "comment_text": req.body.comment_text,
          "comment_date": new Date(),
        }

        var sts = await addcommend(datas)
        if (sts == 1) {
          return res.send({
            'code': 0,
            "message": "Commend Added successfully"
          })
        } else {
          return res.send({
            'code': 1,
            "message": "something went wrong"
          })
        }
      } else {
        return res.send({
          'code': 1,
          "message": "Invalid User Id"
        })
      }

    } else {
      return res.send({
        'code': 1,
        "message": "Invalid Post Id"
      })
    }
  } else {
    return res.send({
      'code': 1,
      "message": "Invalid form type"
    })
  }

})

router.get('/images/:id', async (req, res) => {

  var file = req.params.id;
  var url =  process.env.upload_path + file;

  var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
  };

  var type = mime[path.extname(file).slice(1)]
  console.log(path.extname(file).slice(1))

  // Read the image file
  fs.readFile(url, (err, data) => {
    if (err) {
      // Handle any errors (e.g., file not found)
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Image not found'+url);
    } else {
      // Set the content type to image/jpeg (or the appropriate type for your image)
      // res.writeHead(200, { 'Content-Type': type });
      // Send the image data as the response
      res.end(data);
    }
  });

})

router.get('/all/:id',isAuth, async (req, res, next) => {
  const posts = await getpost(req.params.id)
  return res.send({
    'code': 0,
    // "message": "Invalid User Id",
    "data": posts
  })

})

router.get('/allposts',isAuth, async (req, res) => {
  const posts = await explorepost()
  return res.send({
    'code': 0,
    "message": "Invalid User Id",
    "data": posts
  })
})


router.post('/images/:id',isAuth, upload.single('file'), async (req, res, next) => {

  if (req.params.id != 0) {
    const data = await checkuserId(req.params.id)
    if (data == 1) {
      return res.send({
        'code': 0,
        "message": "Image Upload Successfully",
        "imageURL":  process.env.server_url + filename,
      })
    } else {
      return res.send({
        'code': 1,
        "message": "Invalid User Id"
      })
    }



  } else {
    return res.send({
      'code': 1,
      "message": "some thing went wrong"
    })
  }

})

router.get('/getdata/:id',isAuth, async (req, res) => {
  var data = await viewpost(req.params.id);
  var msg = await  getcomments(req.params.id);
  var follows = await checkfollow(10)
 
  return res.send({
    'code': 0,
    "message": 'Success',
    "data": data,
    "comments":msg,
    "isfollow":follows
  })
})

module.exports = router
