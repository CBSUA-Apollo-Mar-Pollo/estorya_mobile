import { Router } from "express";
import { getAllPosts } from "../controller/posts/getAllPostController.js";

const postRouter = Router();

postRouter.get("/", getAllPosts);

export default postRouter;
