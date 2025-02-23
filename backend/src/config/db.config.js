import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { initializeModels } from "../models/index.js";

dotenv.config();

export const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: "postgres",
  logging: false,
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
});

export const db = async () => {
  try {
    await sequelize.authenticate();
    initializeModels(); // Ensure this is called before syncing

      sequelize.sync({ alter: true }).then(() => {
        console.log("✅ Database synced");
      }).catch(err => {
        console.error("❌ Error syncing database:", err);
      });
    await sequelize.sync({ alter: true }); // Sync models
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed", error);
  }
};
