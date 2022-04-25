var express = require("express");
var router = express.Router();
const {
  CommunicationIdentityClient,
} = require("@azure/communication-identity");

const connectionString =
  process.env["COMMUNICATION_SERVICES_CONNECTION_STRING"];
const identityClient = new CommunicationIdentityClient(connectionString);
console.log(connectionString);

//Create or refresh an access token
router.get("/", async function (req, res) {
  let identityResponse = null;
  if (req.query.identifier) {
    identityResponse = { communicationUserId: req.query.identifier };
  } else {
    identityResponse = await identityClient.createUser();
  }

  try {
    let tokenResponse = await identityClient.getToken(identityResponse, [
      "voip",
    ]);

    // Get the token and its expiration date from the response
    const { token, expiresOn } = tokenResponse;

    return res.status(200).json({
      identifier: identityResponse.communicationUserId,
      token: token,
      expiresOn: expiresOn,
    });
  } catch {
    return res
      .status(400)
      .json({ message: "Identifier doesn't exist or has the wrong format." });
  }
});

module.exports = router;
