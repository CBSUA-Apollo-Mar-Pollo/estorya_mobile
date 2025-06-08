import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { PORT } from "./config/env.js";
import postRouter from "./routes/posts.routes.js";
import authRouter from "./routes/auth.routes.js";
import profileRouter from "./routes/profile.route.js";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./lib/uploadthing.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);

app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
  })
);

// set server
app.listen(PORT, () => {
  try {
    console.log(`Server listening on ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
