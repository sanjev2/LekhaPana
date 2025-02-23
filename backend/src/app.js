import express from "express";
import cors from "cors";
import morgan from "morgan";
import { Sequelize } from "sequelize";
import ApiError from "./utils/ApiError.js";
import ErrorHandling from "./middlewares/ErrorHandler.js";
import routes from "./routes/index.js";

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1", routes);

// 404 Handler
app.use("*", (req, res, next) => {
  next(new ApiError(404, "Page not found"));
});

// Global Error Handler
app.use(ErrorHandling);

export default app;
