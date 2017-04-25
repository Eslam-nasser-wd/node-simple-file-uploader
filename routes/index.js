const express         = require('express');
const router          = express.Router();
const multer          = require('multer')
const crypto          = require('crypto')
const path            = require('path');

// Multer settings
var storage = multer.diskStorage({
  destination: './uploads/images/', // upload directory
  filename: function (req, file, cb) { // create random name for the new file
    crypto.randomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})
var upload = multer({ storage: storage })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// File upload
router.post('/upload', upload.single('postImage'), function(req, res, next) {
  console.log('\nFILE DETAILS ==> ', req.file)
  res.json({
    file_details: req.file
  })
});

module.exports = router;
