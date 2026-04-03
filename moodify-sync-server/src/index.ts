import cookieParser from "cookie-parser";
import dbConnection from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import app from "./server.js";
import express from "express";

dbConnection();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(5000, () => {
  console.log("server is running okay");
});
