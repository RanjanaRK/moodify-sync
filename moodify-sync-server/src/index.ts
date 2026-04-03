import "dotenv/config";
import app from "./server";
import express from "express";
import dbConnection from "./config/db";
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";

dbConnection();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(5000, () => {
  console.log("server is running okay");
});
