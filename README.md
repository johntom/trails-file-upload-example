# Trails File Upload Example Fork

This is a fork of https://github.com/trailsjs/trails-file-upload-example
I created this fork because I made subtle errors while tring to implement in my backend server
1. I create a new UploadController which does not rely on policy
2. I defaulted to an array of uploads to handle 1 or more files on payload and saved file with original name. 
3. I removed the view from the controller as my server are always seperated from views
4. I will publish aurelia front asap as shown below with server console shown on right
5. Make sure your id or name used in html client matches name used for upload on server. see http://stackoverflow.com/questions/31530200/node-multer-unexpected-field



![Aurelia/Trials upload](https://github.com/johntom/trails-file-upload-example/uploadart.jpg "Aurelia/Trials upload")


# end of fork description

This repo describes how to upload files using the `multer` middleware with `trailpack-express`.

TrailsMail is an imaginary email service that allows you to send an email with an attachment to an email address of your choice.  Once the message and attachment have been received by the server, different statistics about the message are displayed.

## Setup

```js
  git clone git@github.com:trailsjs/trails-file-upload-example.git && cd trails-file-upload-example
  npm install
  npm start
```

Open `localhost:3000` in your browser of choice.

## Flow

User fills out a form with fields `recipient`, `subject`, `message`, and `file`.  
```html

<!-- views/index.html -->

<form class="pure-form pure-form-stacked" action="/message" method="post" enctype="multipart/form-data">
  <fieldset>
    <label for="recipient">Recipient</label>
    <input name="recipient" id="recipient" type="email" placeholder="Email">

    <label for="subject">Subject Line</label>
    <input name="subject" id="subject" type="text" placeholder="Subject Line">

    <label for="message">Message</label>
    <textarea name="message" rows="5" cols="40" placeholder="Your message here"></textarea>

    <label for="subject">Attachment<label>
    <input name="file" type="file" placeholder="Password">
    <button class="pure-button pure-button-primary">Send</button>
  </fieldset>
</form>
```

On submit, the browser makes a request to `POST /message`, which is directed towards `MessageController#send`.

```js
// config/routes.js
module.exports = [
...
  {
    method: [ 'POST' ],
    path: '/message',
    handler: 'MessageController.send'
  }
...
]
```

In `config/policies.js`, note that a Policy has been configured for `MessageController#send`, so the request will be handled by `MessagePolicy#single` on it's way to `MessageController#send`
```js
// config/policies.js
module.exports = {
  ...
  MessageController: {
    send: [ 'MessagePolicy.single' ]
  }
  ...
}
```

In `MessagePolicy`, we can use Express middleware to modify the request.
In this example, files are saved to an uploads directory within the project
directory.

```js
  // api/policies/MessagePolicy.js

  ...

  const multer = require('multer')
  const upload = multer({dest: 'uploads/'})

  ...

  module.exports = class MessagePolicy extends Policy {
    single (req, res, next) {
      upload.single('file')(req, res, err => {
        if (err) {
          this.log.info(err)
        }
        next()
      })
    }
  }

```

Once the request object has arrived at `MessageController#send` `body` and `file` properties have been added by `multer.`

```js
  // api/controllers/MessageController.js
module.exports = class MessageController extends Controller {
  ...
    send (req, res) {

    this.log.info('Form Body')
    this.log.info(req.body)

    this.log.info('Attachment')
    this.log.info(req.file)

    res.render('sent', {
      recipient: req.body.recipient,
      subject: req.body.subject,
      message: req.body.message,
      file: req.file
    })

  }
  ...
}

```
