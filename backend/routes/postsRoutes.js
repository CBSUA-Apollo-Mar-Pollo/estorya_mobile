import express from "express";
import { getAllPosts } from "../controller/posts/getAllPostController.js";

const router = express.Router();

router.get("/getPosts", getAllPosts);

export default router;
