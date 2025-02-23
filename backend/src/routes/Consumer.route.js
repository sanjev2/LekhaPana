import { Router } from "express"
import Authentication from "../middlewares/Authentication.js"
import ConsumerController from "../controllers/Consumer.controller.js"
import ConsumerValidation from "../validations/Consumer.validation.js"
import Validation from "../middlewares/Validation.js"

const router = Router()

router.use(Authentication)

router.get("/get-all", ConsumerValidation.query_page, Validation, ConsumerController.GetAllUser)
router.get("/get-search", ConsumerController.GetUserForSearch)
router.post("/register", ConsumerValidation.RegisterConsumer, Validation, ConsumerController.RegisterConsumer)
router.delete("/delete/:id", ConsumerValidation.Params_id, Validation, ConsumerController.DeleteConsumer)

router.route("/dashboard").get(ConsumerController.DashboardData)

router.get("/get/:id", ConsumerValidation.Params_id, Validation, ConsumerController.getById)
router.patch("/update/:id", ConsumerValidation.RegisterConsumer, Validation, ConsumerController.updateById)

export default router

