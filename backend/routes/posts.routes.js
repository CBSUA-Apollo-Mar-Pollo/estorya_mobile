import { Router } from "express";
import { getAllPosts } from "../controller/posts/getAllPostController.js";
import { getPostDetails } from "../controller/posts/getPostDetails.js";
import { getPostComments } from "../controller/posts/getPostComments.js";

const postRouter = Router();

postRouter.get("/", getAllPosts);
postRouter.post("/postDetails", getPostDetails);
postRouter.post("/postComments", getPostComments);

export default postRouter;
