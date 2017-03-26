'use strict'

const Controller = require('trails-controller')

/**
 * @module MessageController
 * @description Generated Trails.js Controller.
 */

module.exports =
  class MessageController extends Controller {

    send (req, res) {
      this.log.info(req.files)
      // call view
      res.render('sent', {
        recipient: req.body.recipient,
        subject: req.body.subject,
        message: req.body.message,
        file: req.file
      })
    }

}
