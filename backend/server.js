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
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    // Read file buffer from temp upload location
    const fileBuffer = fs.readFileSync(req.file.path);

    // Create File object (in Node 18+ global, or use 'file-api' polyfill if needed)
    const file = new File([fileBuffer], req.file.originalname, {
      type: req.file.mimetype,
    });

    // Upload using UTApi
    const uploadResponse = await utapi.uploadFiles(file);

    if (uploadResponse.error) {
      return res.status(500).json({ error: uploadResponse.error });
    }

    // Clean up the temp file
    fs.unlinkSync(req.file.path);

    return res.json(uploadResponse.data); // { fileUrl, fileKey, ... }
  } catch (error) {
    console.error("UploadThing server error:", error);
    res.status(500).json({ error: error.message });
  }
});

// set server
app.listen(PORT, () => {
  try {
    console.log(`Server listening on ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
