'use strict'
const util = require('util')
const lodash = require('lodash')

const path = require('path')
const walk = require('walk')
const Controller = require('trails-controller')
const fs = require('fs.extra');

/**
 * @module WalkdirController
 * @description TODO document Controller.
 */
module.exports = class WalkdirController extends Controller {
    //       index(req, res) {
    //     res.render('index')
    //   }
    imageview(req, res) {
        //console.log('gallery imageview ./api/docs... ', req.param('file'));
        filetype = req.param('file').substr(0, 3);
        dir = req.param('dir');
        if (dir !== undefined) {
            filepath = './api/docs/' + dir + '/';
        } else {
            filepath = './api/docs/';
        }
        fs.readFile(filepath + req.param("file"), "binary", function (error, file) {
            if (error) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.write(error + "\n");
                res.end();
            }
            else {
                res.writeHead(200, { "Content-Type": "image/jpeg" });
                res.write(file, "binary");
                res.end();

            }
        });

    }


    // getFile(imagepath) {
    getFile(req, res) {
        console.log('getfile getImage');
        //  let template = req.param('template')
        let filename = req.param('filename')
        //console.log('getonePdf  $template:$s filename:$s.. ', template, filename)

        console.log('getonePdf  $template:$s filename:$s.. ', filename)

        // example let docfilepath = 'C:/trails/Union94/trails-unionv2/api/docs/pdf/TYPE1/035.pdf'
        //    fs.readFile(docfilepath, 'binary', function (error, file) {
        let rr = path.resolve(__dirname, '..')
        // let filepath = rr + '/docs/pdf/' website
        //let filepath = 'E:/Docs/Images/pdf' //image dir
        let filepath = 'Uploads' //image dir
        var extname = path.extname(filename)
        // console.log('pdfview filepath:$ filename:$ join:$ extname:$ ', filepath, filename, path.join(filepath, template + '/' + filename), extname) //, extname) 
        console.log('pdfview filepath:$ filename:$ join:$ extname:$ ', filepath, filename, path.join(filepath, '/' + filename), extname) //, extname) 

        //  fs.readFile(path.join(filepath, template + '/' + filename), 'binary', function (error, file) {
        fs.readFile(path.join(filepath, '/' + filename), 'binary', function (error, file) {

            if (error) {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                })
                res.write(error + "\n")
                res.end()
            } else {
                switch (extname) {
                    case '.pdf':
                        res.writeHead(200, {
                            "Content-Type": "application/pdf"
                        })
                        res.write(file, "binary")
                        res.end()
                        break
                    case '.csv':

                        // let rr = 'E:/Docs/Images/pdf' //image dir

                        // let filepath = rr + '/docs/pdf/'+template+'/'+filename
                        let downloadpath = path.join(filepath, '/' + filename)
                        //   console.log('filepath  filepath ', filepath, filename)

                        res.download(downloadpath);


                        break
                    case '.jpg':
                        res.writeHead(200, {
                            "Content-Type": "image/jpeg"
                        })
                        res.write(file, "binary")
                        res.end()
                        break
                    case '.tiff':
                        res.writeHead(200, {
                            "Content-Type": "image/tif"
                        })
                        res.write(file, "binary")
                        res.end()
                        break
                    case '.docx':
                        res.writeHead(200, {
                            "Content-Type": "application/docx"
                        })
                        res.write(file, "binary")
                        res.end()
                        break
                    case '.doc':
                        res.writeHead(200, {
                            "Content-Type": "application/doc"
                        })
                        res.write(file, "binary")
                        res.end()
                        break
                    default:
                        res.writeHead(200, {
                            "Content-Type": "application/pdf"
                        })
                        res.write(file, "binary")
                        res.end()
                        break
                }
            }
        })

    }

    // /images/Crew/8101363005_1fefd75305_b.jpg


    getDir(req, res) {

        var files = [];
        var gallery = req.param('id');
        //var dd = '../MeansBasePT3/api/docs/crew';//works
        //  var dd = '../PrimeTime3/api/docs/' + gallery;
        // claims/claimid
        // var dd = '../../uploads' ////' + gallery;
        var dd = 'uploads'
        console.log('getGallery ', dd)
        var walker = walk.walk(dd, { followLinks: false });

        walker.on('file', function (root, stat, next) {
            // Add this file to the list of files
            //            files.push({url:'imagescrew/' + stat.name, "title" : "Presenting big pictures", "description":"Showing fullscreen images to present all your best!"});
            files.push({
                // url: 'images/' + gallery + '/' + stat.name,
                // url: 'uploads/' + stat.name
                url: stat.name
                //   ,   "title": "Presenting big pictures",
                // "description": "Showing fullscreen images to present all your best!"
            });
            next();
        });

        walker.on('end', function () {
            console.log(files);
            res.send({ data: files });
        });
    }

}

