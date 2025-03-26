import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { PORT } from "./config/env.js";
import postRouter from "./routes/posts.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/posts", postRouter);

// set server
app.listen(PORT, () => {
  try {
    console.log(`Server listening on ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
