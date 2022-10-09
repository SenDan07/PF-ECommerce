const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();
const { CLIENT_ID } = process.env;

const client = new OAuth2Client(CLIENT_ID); // variables de cliente id

async function googleVerify(token = "") {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend

    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const { name, picture, email } = ticket.getPayload();

  const userid = payload["sub"];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  return {
    name,
    picture,
    email,
  };
}
//verify().catch(console.error);

module.exports = {
  googleVerify,
};
