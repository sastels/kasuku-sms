const dotenv = require("dotenv");
dotenv.config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const fromNumber = process.env.FROM_NUMBER;

const client = require("twilio")(accountSid, authToken);

export default sendSms = (number, message) => {
  client.messages
    .create({
      body: message,
      from: fromNumber,
      to: number
    })
    .then(message => console.log(message.sid));
};
