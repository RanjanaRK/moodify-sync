import "dotenv/config";
import app from "./server";
import dbConnection from "./config/db";

dbConnection();

app.listen(8000, () => {
  console.log("server is running okay");
});
