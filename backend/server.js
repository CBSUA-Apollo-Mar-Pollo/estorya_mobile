import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import postsRoutes from "./routes/postsRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000;

app.use(postsRoutes);

// set server
app.listen(port, () => {
  try {
    console.log(`Server listening on ${port}`);
  } catch (error) {
    console.log(error);
  }
});
