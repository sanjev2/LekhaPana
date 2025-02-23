import { body, param, query } from "express-validator"
import { validateUUID } from "../utils/validate.utils.js"

class ConsumerValidation {
  static RegisterConsumer = [
    body("name").notEmpty().withMessage("name can not be empty"),
    body("email").isEmail().withMessage("email must be valid").notEmpty().withMessage("email can not be empty"),
    body("mobile").notEmpty().withMessage("Mobile can not be empty"),
    body("dob").notEmpty().withMessage("dob can not be empty"),
    body("address").notEmpty().withMessage("address can not be empty"),
  ]

  static Params_id = [
    param("id").custom(validateUUID).withMessage("provide valid UUID").notEmpty().withMessage("Id is required"),
  ]

  static query_page = [
    query("page").optional().isInt().withMessage("Page must be an integer"),
    query("query").optional().isString().withMessage("Query must be a string"),
  ]
}

export default ConsumerValidation

