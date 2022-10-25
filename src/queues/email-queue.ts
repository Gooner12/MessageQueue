import Bull from "bull";
import { REDIS_URL, REDIS_PORT } from "../config/redis-credentials";
import emailProcess from "../processes/email-process";
import { createBullBoard } from "bull-board";
import { BullAdapter } from "bull-board/bullAdapter";

type Request = {
  from: string;
  to: string;
  subject: string;
  msg: string;
};

// producer
const emailQueue: Bull.Queue = new Bull("email", {
  redis: {
    host: REDIS_URL,
    port: REDIS_PORT,
  },
  limiter: {
    max: 500,
    duration: 10000,
  },
});

// for visualising emailQueue in bull board ui
const { router, setQueues } = createBullBoard([new BullAdapter(emailQueue)]);

// consumer or worker
emailQueue.process(emailProcess);

// adding the job to the queue
const sendEmailJob = async (data: Request) => {
  emailQueue.add(data, {
    attempts: 5,
    delay: 10000,
    priority: 3,
  });
};

export { sendEmailJob, router };
