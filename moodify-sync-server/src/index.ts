import "dotenv/config";
import app from "./server";
import dbConnection from "./config/db";
import authRouter from "./routes/auth.route";

dbConnection();

app.use("/api/auth", authRouter);

app.listen(5000, () => {
  console.log("server is running okay");
});
