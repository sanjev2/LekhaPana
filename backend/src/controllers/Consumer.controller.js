import httpStatus from "http-status"
import CatchAsync from "../utils/CatchAsync.js"
import ConsumerService from "../services/Consumer.service.js"
import { validateUUID } from "../utils/validate.utils.js"

class ConsumerController {
  static RegisterConsumer = CatchAsync(async (req, res) => {
    const res_obj = await ConsumerService.RegisterConsumer(req.user, req.body)
    return res.status(httpStatus.CREATED).json(res_obj)
  })

  static updateById = CatchAsync(async (req, res) => {
    const { id } = req.params
    if (!validateUUID(id)) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Invalid ID format" })
    }
    const res_obj = await ConsumerService.updateById(req.user, req.body, id)
    return res.status(httpStatus.OK).json(res_obj)
  })

  static getById = CatchAsync(async (req, res) => {
    const { id } = req.params
    if (!validateUUID(id)) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Invalid ID format" })
    }
    const res_obj = await ConsumerService.getById(req.user, id)
    return res.status(httpStatus.OK).json(res_obj)
  })

  static GetAllUser = CatchAsync(async (req, res) => {
    const res_obj = await ConsumerService.GetAllUser(req.user, req.query?.page, req.query?.query)
    return res.status(httpStatus.OK).json(res_obj)
  })

  static DeleteConsumer = CatchAsync(async (req, res) => {
    const { id } = req.params
    if (!validateUUID(id)) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Invalid ID format" })
    }
    const res_obj = await ConsumerService.DeleteConsumer(req.user, id)
    return res.status(httpStatus.OK).json(res_obj)
  })

  static GetUserForSearch = CatchAsync(async (req, res) => {
    const res_obj = await ConsumerService.GetUserForSearch(req.user)
    return res.status(httpStatus.OK).json(res_obj)
  })

  static DashboardData = CatchAsync(async (req, res) => {
    const res_obj = await ConsumerService.DashboardData(req.user)
    return res.status(httpStatus.OK).json(res_obj)
  })
}

export default ConsumerController

