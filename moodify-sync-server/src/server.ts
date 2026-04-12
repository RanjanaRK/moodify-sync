import express, { Request, Response } from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("server is running");
});

export default app;
