import "dotenv/config";
import app from "./server";
import dbConnection from "./config/db";
import authRouter from "./routes/auth.route";

dbConnection();

authRouter.use("/api/auth", authRouter);

app.listen(8000, () => {
  console.log("server is running okay");
});
