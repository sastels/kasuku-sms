const dotenv = require("dotenv");
dotenv.config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const fromNumber = process.env.FROM_NUMBER;

const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    body: "Hello World!",
    from: fromNumber,
    to: "+16136192797"
  })
  .then(message => console.log(message.sid));
