import path from "path";
import express from "express";

import { handleEvent, getScores } from "./helpers";

const app = express();
const port = 80;

const startTime = new Date().getTime();

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/log-movement", (_req, res) => {
  handleEvent(new Date().getTime());
  res.sendStatus(200);
});

app.post("/log-scores", (_req, res) => {
  console.log(getScores(startTime));
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(
    `Mouse movement detection app running at http://localhost:${port}`
  );
});
