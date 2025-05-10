import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(
  "515754395613-nontlgh4aqslf1nv9rtfrtteih7ikh6n.apps.googleusercontent.com"
);

export const verifyToken = async (req, res) => {
  const { idToken } = req.body;

  //   console.log(idToken, "idToken from backend");

  const ticket = await client.verifyIdToken({
    idToken,
    audience:
      "515754395613-nontlgh4aqslf1nv9rtfrtteih7ikh6n.apps.googleusercontent.com", // Must match the client ID from Google Console
  });
  const payload = ticket.getPayload();

  console.log(payload, "payload from verifying the token");

  return idToken; // e.g. payload.email, payload.sub (Google user ID)
};
