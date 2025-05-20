import { Router } from "express";
import { verifyToken } from "../controller/auth/verifyToken.js";
import { getProfileData } from "../controller/profile/getProfileData.js";

const profileRouter = Router();

profileRouter.post("/getProfileData", getProfileData);

export default profileRouter;
