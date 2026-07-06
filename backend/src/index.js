import dotenv from "dotenv";
import db from "./config/database.js";
import app from "./app.js";
import { Connection } from "mysql2";

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    const connection = await db.getConnection();
    console.log("connection successful");
    connection.release();
    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.log("failed", error);
  }
};

startServer()