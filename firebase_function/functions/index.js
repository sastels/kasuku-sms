const functions = require("firebase-functions");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// deploy with
//    $ firebase deploy

// usage:
//    $ curl -d "kidId=333" -X POST https://us-central1-kasuku-parents.cloudfunctions.net/sessionDone

exports.ping = functions.https.onRequest((_request, response) => {
  response.send("pong");
});

exports.sessionDone = functions.https.onRequest((req, res) => {
  const kidId = req.query.kidId || req.body.kidId;
  if (!kidId) {
    res.send("Sorry, I don't understand: need to send kidId");
  }

  res.send(`Hi there ${kidId}!!`);
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const fromNumber = process.env.FROM_NUMBER;

  const toNumber = process.env.TO_NUMBER;

  const client = require("twilio")(accountSid, authToken);
  client.messages
    .create({
      body: "Hello World!",
      from: fromNumber,
      to: toNumber
    })
    .then(message => console.log(message.sid))
    .catch(error => {
      res.status(502).send("Error sending message");
    });
});

exports.sms = functions.https.onRequest((req, res) => {
  const From = req.query.From || req.body.From;
  const Body = req.query.Body || req.body.Body;
  if (!From || !Body) {
    res.send("Sorry, I don't understand: need to send From and Body");
  }

  const twiml = new MessagingResponse();
  console.log(`From ${req.body.From}: ${req.body.Body}`);
  if (Body === "Hello") {
    twiml.message("Hi!");
  } else if (Body === "Bye") {
    twiml.message("Goodbye");
  } else {
    twiml.message(
      "No Body param match, Twilio sends this in the request to your server."
    );
  }
  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});
