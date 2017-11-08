/**
 * Routes Configuration
 * (trails.config.routes)
 *
 * Configure how routes map to views and controllers.
 *
 * @see http://trailsjs.io/doc/config/routes.js
 */

'use strict'

module.exports = [

  /**
   * Render the HelloWorld view
   */
  {
    method: 'GET',
    path: '/',
    handler: 'ViewController.index'
  },

  /**
   * Constrain the DefaultController.info handler to accept only GET requests.
   */
  {
    method: [ 'GET' ],
    path: '/api/v1/default/info',
    handler: 'DefaultController.info'
  },

  {
    method: [ 'POST' ],
    path: '/message',
    handler: 'MessageController.send'
  },

  {
    method: [ 'POST' ],
    path: '/messages',
    handler: 'MessageController.send'
  },
  {
    method: [ 'POST' ],
    path: '/upload',
    handler: 'UploadController.uploadfiles'
  },
   


    { method: ['get'], path: '/api/v1/getdir', handler: 'WalkdirController.getDir' },
    { method: ['get'], path: '/api/v1/getfile/:filename', handler: 'WalkdirController.getFile' },
    
    
    
    // { method: ['get'], path: '/api/v1/getdir/:id', handler: 'WalkdirController.getDir' },
  
   // 'get /api/getdir': 'WalkdirController.getDirParam',
    
   
   // 'get /api/galleryaticlesKendo/:id': 'GalleryController.getGalleryArticlesKendo',


    // 'get /api/gallerythumbsKendo/:id': 'GalleryController.getThumbsKendo',


    // 'get /api/galleryNewWallop/:id': 'GalleryController.getGalleryNewWallop',
    // 'get /api/getFader/:id': 'GalleryController.getFader',


]
