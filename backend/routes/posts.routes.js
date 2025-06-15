import { Router } from "express";
import { getAllPosts } from "../controller/posts/getAllPostController.js";
import { getPostDetails } from "../controller/posts/getPostDetails.js";
import { getPostComments } from "../controller/posts/getPostComments.js";
import { uploadPost } from "../controller/posts/uploadPost.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const postRouter = Router();

postRouter.get("/", getAllPosts);
postRouter.post("/postDetails", getPostDetails);
postRouter.post("/postComments", getPostComments);
postRouter.post("/", authenticateToken, uploadPost);

export default postRouter;
