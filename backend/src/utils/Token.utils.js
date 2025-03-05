import jwt from "jsonwebtoken"
import { PUBLIC_DATA } from "../../constant.js"

export const generatoken = (user, expire = "1d") => {
  const token = jwt.sign({ userid: user.id }, PUBLIC_DATA.jwt_auth, {
    expiresIn: expire,
  })
  return token
}

export const validateToken = (token) => {
  const tokens = jwt.verify(token, PUBLIC_DATA.jwt_auth)
  return tokens
}

