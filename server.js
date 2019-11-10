const http = require("http");
const express = require("express");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();
  console.log(`From ${req.body.From}: ${req.body.Body}`);
  if (req.body.Body == "Hello") {
    twiml.message("Hi!");
  } else if (req.body.Body == "Bye") {
    twiml.message("Goodbye");
  } else {
    twiml.message(
      "No Body param match, Twilio sends this in the request to your server."
    );
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log("Express server listening on port 1337");
});

// https://www.twilio.com/blog/2013/10/test-your-webhooks-locally-with-ngrok.html
//
// $ ngrok 1337
