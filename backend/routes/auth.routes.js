import { Router } from "express";
import { verifyToken } from "../controller/auth/verifyToken.js";

const authRouter = Router();

authRouter.post("/verifyToken/google", verifyToken);

export default authRouter;
