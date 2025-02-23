import { Sequelize } from "sequelize";
import ApiError from "../utils/ApiError.js";

const ErrorHandling = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Sequelize.ValidationError) {
    statusCode = 400;
    message = err.errors[0]?.message || "Validation error";
  } else if (err instanceof Sequelize.DatabaseError) {
    statusCode = 500;
    message = "Database error occurred";
  } else {
    message = err.message;
  }

  res.status(statusCode).json({ statusCode, message });
};

export default ErrorHandling;
