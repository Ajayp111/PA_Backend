const accountSid = "AC2f08c9a3e38132878fc0fe95151ecf67";
const authToken = "68974dfff38b84c896c89d2575b6a535";
const phone = "+19896253678";

const client = require("twilio")(accountSid, authToken);

exports.sendSmsViaTwilio = (body, to) => {
  return client.messages
    .create({
      body: body,
      from: phone,
      to: to,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
};
