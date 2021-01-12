import path from "path";
import express from "express";
import { handleEvent, getTimePeriods } from "./helpers";

let session = require("express-session");

const app = express();
const port = 80;

const startTime = new Date().getTime();

app.use(
  session({
    secret: "Jzbuh@ydC46$6^j",
    SameSite: "strict",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/log-movement", (req, res) => {
  handleEvent(req.sessionID, new Date().getTime());
  res.sendStatus(200);
});

app.get("/get-scores", (req, res) => {
  const scores = getTimePeriods(req.sessionID, startTime);
  res.json({
    sessionID: req.sessionID,
    scores: scores,
  });
});

app.listen(port, () => {
  console.log(
    `Mouse movement detection app running at http://localhost:${port}`
  );
});
