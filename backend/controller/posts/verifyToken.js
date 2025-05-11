import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.CLIENT_ID);

export const verifyToken = async (req, res) => {
  try {
    const idToken = JSON.parse(req.body.idToken); // safely converts '"abc"' → 'abc'

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.CLIENT_ID, // Must match the client ID from Google Console
    });

    const payload = ticket.getPayload();

    console.log(payload, "payload from verifying the token");

    return idToken; // e.g. payload.email, payload.sub (Google user ID)
  } catch (error) {
    console.error(error);
  }
};
