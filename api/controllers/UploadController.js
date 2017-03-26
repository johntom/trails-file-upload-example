'use strict'

const Controller = require('trails-controller')
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
 * @module MessageController
 * @description Generated Trails.js Controller.
 */
module.exports =
  class UploadController extends Controller {
    // send (req, res, next) {
    uploadfiles (req, res) {
      // single (req, res, next) {
      this.log.info('UploadController uploadfilest')
      upload.array('file')(req, res, err => {
        if (err) {
          this.log.info(err)
        }

        this.log.info(req.files)
        let flen = req.files.length
        let mess = flen + ' files uploaded'
        return res.json({'message': mess })
      })
    }
}
