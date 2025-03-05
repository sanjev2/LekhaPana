import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import { validateToken } from "../utils/Token.utils.js";

const Authentication = (req, res, next) => {
  try {
    const headers = req.headers['authorization'] || '';

    if (!headers || !headers.startsWith("Bearer ")) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Please Login first");
    }

    const auth_token = headers.split(" ")[1];

    if (!auth_token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Please Provide valid token");
    }

    const data = validateToken(auth_token);
    req.user = data.userid;
    next();
  } catch (error) {
    next(error);
  }
};

export default Authentication;
