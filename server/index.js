const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const MessagingResponse = require('twilio').twiml.MessagingResponse;

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
  const twiml = new MessagingResponse();

  console.log('SMS received!!!');

  if (req.body.Body.toLowerCase().indexOf('robot') > -1) {
    twiml.message('Robots are awesome! 🤖🤖🤖');

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  } else {
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end()
  }
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}!`))
