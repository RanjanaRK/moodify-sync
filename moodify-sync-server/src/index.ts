import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import dbConnection from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import songRouter from "./routes/song.route.js";
import userRouter from "./routes/user.route.js";
import app from "./server.js";

dbConnection();

app.set("trust proxy", 1);
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/song", songRouter);

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log("server is running okay");
});
