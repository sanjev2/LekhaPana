import { validationResult } from "express-validator"
import ApiError from "../utils/ApiError.js"
import httpStatus from "http-status"

const Validation = (req, res, next) => {
  try {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      throw new ApiError(httpStatus.BAD_REQUEST, result.array()[0].msg)
    }

    next()
  } catch (error) {
    next(error)
  }
}

export default Validation

