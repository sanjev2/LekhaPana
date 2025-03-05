import httpStatus from "http-status"
import CatchAsync from "../utils/CatchAsync.js"
import OrderService from "../services/Orders.service.js"
import { validateUUID } from "../utils/validate.utils.js"

class OrdersController {
  static createOrder = CatchAsync(async (req, res) => {
    const res_obj = await OrderService.createOrder(req.user, req.body)
    return res.status(httpStatus.CREATED).json(res_obj)
  })

  static getAllorders = CatchAsync(async (req, res) => {
    const res_obj = await OrderService.getAllorders(req.user, req.query?.page, req.query?.query)
    return res.status(httpStatus.OK).json(res_obj)
  })

  static deleteOrder = CatchAsync(async (req, res) => {
    const { id } = req.params
    if (!validateUUID(id)) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Invalid ID format" })
    }
    const res_obj = await OrderService.deleteOrder(req.user, id)
    return res.status(httpStatus.OK).json(res_obj)
  })

  static getInvoiceById = CatchAsync(async (req, res) => {
    const { id } = req.params
    if (!validateUUID(id)) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Invalid ID format" })
    }
    const res_obj = await OrderService.getInvoiceById(req.user, id)
    return res.status(httpStatus.OK).json(res_obj)
  })
}

export default OrdersController

