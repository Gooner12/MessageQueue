import express from "express";
import bodyParser from "body-parser";
import { router } from "./queues/email-queue";
import { expressRouter } from "./routes/work-route";

const app: express.Application = express();
app.use(bodyParser.json());

app.use("/admin/queues", router);
app.use("/", expressRouter);

app.listen(5001, () => console.log("Server is listening on port 5001."));