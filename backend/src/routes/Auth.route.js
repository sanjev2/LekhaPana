import { Router } from "express"
import AuthController from "../controllers/Auth.controller.js"
import Authentication from "../middlewares/Authentication.js"
import Validation from "../middlewares/Validation.js"
import AuthValidation from "../validations/Auth.validation.js"

const router = Router()

router.post("/register", AuthValidation.RegisterUser, Validation, AuthController.RegisterUser)
router.post("/login", AuthValidation.LoginUser, Validation, AuthController.LoginUser)
router.get("/profile", Authentication, AuthController.ProfileController)

export default router

