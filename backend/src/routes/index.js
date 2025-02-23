import { Router } from "express"
import authRoutes from "./Auth.route.js"
import consumerRoutes from "./Consumer.route.js"
import orderRoutes from "./Order.route.js"

const router = Router()

const routes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/consumer",
    route: consumerRoutes,
  },
  {
    path: "/orders",
    route: orderRoutes,
  },
]

routes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router

