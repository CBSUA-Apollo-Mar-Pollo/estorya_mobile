import { Router } from "express";
import { getAllPosts } from "../controller/posts/getAllPostController.js";
import { getPostDetails } from "../controller/posts/getPostDetails.js";

const postRouter = Router();

postRouter.get("/", getAllPosts);
postRouter.post("/postDetails", getPostDetails);

export default postRouter;
