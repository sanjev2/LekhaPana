import dotenv from "dotenv";
import app from "./src/app.js";
import { db } from "./src/config/db.config.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const initializeServer = async () => {
  try {
    await db();
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  } catch (error) {
    console.error("❌ Server initialization failed:", error);
    process.exit(1);
  }
};

initializeServer();
