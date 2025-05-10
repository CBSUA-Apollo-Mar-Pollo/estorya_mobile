import { Router } from "express";
import { getAllPosts } from "../controller/posts/getAllPostController.js";
import { getPostDetails } from "../controller/posts/getPostDetails.js";
import { getPostComments } from "../controller/posts/getPostComments.js";
import { verifyToken } from "../controller/posts/verifyToken.js";

const postRouter = Router();

postRouter.get("/", getAllPosts);
postRouter.post("/postDetails", getPostDetails);
postRouter.post("/postComments", getPostComments);
postRouter.post("/verifyToken", verifyToken);

export default postRouter;
