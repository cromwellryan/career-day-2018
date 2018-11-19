const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const pusherConfig = require('./pusher-config');

const isItAboutRobots = require('./is-it-about-robots');

const MessagingResponse = require('twilio').twiml.MessagingResponse;

const pusher = new Pusher(pusherConfig);


app.use(bodyParser.urlencoded({ extended: false }));

/*********************************
 * This is our website. 
 * Do you like it?
 * ******************************/
app.use(express.static('public'))

/*********************************
 * Receive messages from twilio!
 * ******************************/
app.post('/sms', (req, res) => {

  console.log('👋 Hi! I received your text message 👌');

  const textReply = new MessagingResponse();

  res.writeHead(200, {'Content-Type': 'text/xml'});

  if (isItAboutRobots(req.body.Body)) {
    textReply.message('Robots are awesome! 🤖🤖🤖');

    res.end(textReply.toString());

    // Send a robot message to our website!
    pusher.trigger('sms-messages', 'robot', {
      "message": req.body.Body
    });
  } else {
    res.end()

    // Send a normal message to our website!
    pusher.trigger('sms-messages', 'normal', {
      "message": req.body.Body
    });
  }
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}!`))
