import { body } from "express-validator"
import { validateUUID } from "../utils/validate.utils.js"

class OrderValidation {
  static CreateOrder = [
    body("user")
      .custom(validateUUID)
      .withMessage("User ID must be a valid UUID")
      .notEmpty()
      .withMessage("User Is Required"),
    body("items").isArray().notEmpty().withMessage("Item Is Required"),
  ]
}

export default OrderValidation

