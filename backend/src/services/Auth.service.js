import httpStatus from "http-status"
import models from "../models/index.js"
import ApiError from "../utils/ApiError.js"
import { generatoken } from "../utils/Token.utils.js"


class AuthService {
  static async RegisterUser(body) {
    const { email, password, name } = body

    const checkExist = await models.User.findOne({ where: { email } })
    if (checkExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User Already Registered")
    }

    const user = await models.User.create({
      email,
      password,
      name,
    })

    const token = generatoken(user)
    const refresh_token = generatoken(user, "2d")

    await models.Profile.create({
      userId: user.id,
      refresh_token,
    })

    return {
      msg: "User Register Successfully",
      token,
    }
  }

  static async LoginUser(body) {
    const { email, password } = body

    const user = await models.User.findOne({ where: { email } })
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User Not Registered")
    }

    if (password !== user.password) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Credentials")
    }

    const token = generatoken(user)

    return {
      msg: "User Login Successfully",
      token,
    }
  }

  static async ProfileService(userId) {
    const user = await models.User.findByPk(userId, {
      attributes: ["name", "email"],
    })

    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User Not Registered")
    }

    return {
      msg: "Data fetched",
      user,
    }
  }
}

export default AuthService

