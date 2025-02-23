import { Router } from "express"
import Authentication from "../middlewares/Authentication.js"
import Validation from "../middlewares/Validation.js"
import OrderValidation from "../validations/Order.validation.js";
import OrdersController from "../controllers/Order.controller.js"

const router = Router()

router.use(Authentication)

router.route("/create-order").post(OrderValidation.CreateOrder, Validation, OrdersController.createOrder)

router.route("/get-orders").get(OrdersController.getAllorders)

router.route("/get-invoice/:id").get(OrdersController.getInvoiceById)

router.route("/delete/:id").delete(OrdersController.deleteOrder)

export default router

