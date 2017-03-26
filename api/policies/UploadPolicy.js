'use strict'

const Policy = require('trails-policy')
const multer = require('multer')
// const upload = multer({
//   dest: 'uploads/',
// })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, '/tmp/my-uploads')
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    // cb(null, file.fieldname + '-' + Date.now())
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

/**
 * @module MulterPolicy
 * @description Policy for using multer.
 */
module.exports =
  class UploadPolicy extends Policy {
// this will upload 1 or more files
// the name 'file' must match whats sent from client 
// <input type="file" name="file" files.bind="file" multiple>
    single (req, res, next) {
      this.log.info('this is executed UploadPolicy 1st')
      upload.array('file')(req, res, err => {
        if (err) {
          this.log.info(err)
        }
        next()
      })
      this.log.info('this is executed 2nd')
    }
}

// files array object
// { '0':
//   { fieldname: 'file',
//     originalname: 'banner1.jpg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: 'uploads/',
//     filename: 'edd334bb1f7d9be7aa0c5019c7acbbc5',
//     path: 'uploads\\edd334bb1f7d9be7aa0c5019c7acbbc5',
//     size: 104547 },