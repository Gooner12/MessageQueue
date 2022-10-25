import { sendEmailJob } from "../queues/email-queue";
import { Request, Response } from "express";

export const sendEmail = async (req: Request, res: Response) => {
    const { msg, ...otherInfo } = req.body;
    await sendEmailJob({ ...otherInfo, html: `<p>${msg}</p>`});
    res.status(200).json("Success");
}
