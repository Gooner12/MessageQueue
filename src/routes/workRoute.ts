import express from "express";
import { sendEmail } from "../controllers/workController";

const expressRouter = express.Router();

expressRouter.post("/send-email", sendEmail);

export { expressRouter };
