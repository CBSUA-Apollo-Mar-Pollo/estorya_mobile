import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import fs from "fs";
import { UTApi } from "uploadthing/server";

import { PORT } from "./config/env.js";
import postRouter from "./routes/posts.routes.js";
import authRouter from "./routes/auth.routes.js";
import profileRouter from "./routes/profile.route.js";

const upload = multer({ dest: "uploads/" }); // temp storage for upload
const utapi = new UTApi();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);

// for uploading image in uploadthing
app.post("/api/upload", upload.array("file", 5), async (req, res) => {
  try {
    console.log(req.files);
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files provided" });
    }

    const uploadResponses = [];

    for (const fileObj of req.files) {
      const fileBuffer = fs.readFileSync(fileObj.path);
      const file = new File([fileBuffer], fileObj.originalname, {
        type: fileObj.mimetype,
      });

      const uploadResponse = await utapi.uploadFiles(file);

      if (uploadResponse.error) {
        uploadResponses.push({ error: uploadResponse.error });
      } else {
        uploadResponses.push(uploadResponse.data);
      }

      fs.unlinkSync(fileObj.path); // Clean up
    }

    return res.json(uploadResponses); // Array of uploaded file metadata
  } catch (error) {
    console.error("UploadThing server error:", error);
    res.status(500).json({ error: error.message });
  }
});

// set server
app.listen(PORT, "0.0.0.0", () => {
  try {
    console.log(`Server listening on ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
