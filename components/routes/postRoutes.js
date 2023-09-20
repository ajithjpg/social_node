const express = require('express')
const router = express.Router({ mergeParams: true })
const multer = require('multer')
var MD5 = require("crypto-js/md5");

var path = require('path');
var fs = require('fs');

// console.log(MD5("Message").toString());

const date = require('date-and-time');

// console.log(date.format(new Date(), 'YYYY/MM/DD HH:mm:ss'))
function getExtension(filename) {
  return filename.split('.').pop();
}

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, MD5(date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')).toString() + '.' + getExtension(file.originalname))
    filename = MD5(date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')).toString() + '.' + getExtension(file.originalname)
  }

})

const upload = multer({ storage: storage })



router.post('/upload', upload.single('post'), async (req, res, next) => {
  console.log(filename)
})

router.get('/images/:id', async (req, res) => {

  var file = req.params.id;
  var url = './uploads/'+file;
 
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

  // Read the image file
  fs.readFile(url, (err, data) => {
    if (err) {
      // Handle any errors (e.g., file not found)
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Image not found');
    } else {
      // Set the content type to image/jpeg (or the appropriate type for your image)
      res.writeHead(200, { 'Content-Type': type });
      // Send the image data as the response
      res.end(data);
    }
  });

})

module.exports = router