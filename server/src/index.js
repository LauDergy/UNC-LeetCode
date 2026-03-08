import cors from "cors";
import express from "express";
import apiRouter from "./routes/api.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use("/api", apiRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`UNC LeetCode server listening on port ${port}`);
});
