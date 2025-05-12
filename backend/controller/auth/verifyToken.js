import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { db } from "../../lib/db.js";
const client = new OAuth2Client(process.env.CLIENT_ID);

export const verifyToken = async (req, res) => {
  try {
    const idToken = JSON.parse(req.body.idToken); // safely converts '"abc"' → 'abc'

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.CLIENT_ID, // Must match the client ID from Google Console
    });

    const payload = ticket.getPayload();
    const userExist = await db.user.findFirst({
      where: {
        name: payload.name,
        email: payload.email,
      },
    });

    if (!userExist) {
      const newUser = await db.user.create({
        data: {
          name: payload.name,
          email: payload.email,
          emailVerified: new Date(),
          image: payload.picture,
        },
      });

      const token = jwt.sign(
        { userId: userExist.id, email: userExist.email },
        process.env.JWT_SECRET,
        { expiresIn: "15d" }
      );
      return res.status(200).json({
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          image: newUser.image,
        },
      });
    } else {
      const token = jwt.sign(
        { userId: userExist.id, email: userExist.email },
        process.env.JWT_SECRET,
        { expiresIn: "15d" }
      );
      return res.status(200).json({
        token,
        user: {
          id: userExist.id,
          name: userExist.name,
          email: userExist.email,
          image: userExist.image,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};
