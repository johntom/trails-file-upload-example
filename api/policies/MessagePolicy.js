'use strict'

const Policy = require('trails-policy')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // cb(null, '/tmp/my-uploads')
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     // cb(null, file.fieldname + '-' + Date.now())
//     cb(null, file.originalname)
//   }
// })

//var upload = multer({ storage: storage })

/**
 * @module MulterPolicy
 * @description Policy for using multer.
 */
module.exports =
  class MessagePolicy extends Policy {

    single (req, res, next) {
      upload.single('file')(req, res, err => {
        if (err) {
          this.log.info(err)
        }
        next()
      })
    }
}
