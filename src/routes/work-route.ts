import express from "express";
import { sendEmail } from "../controllers/work-controller";

const expressRouter = express.Router();

expressRouter.post("/send-email", sendEmail);

export { expressRouter };
