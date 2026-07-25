import Router from 'express'
import { createOrder, processOrder } from '../../controllers/Payment/payment.controller.js'
import { verifyJwt } from '../../middlewares/auth.middleware.js'

const router = Router()

router.route("/order").post(verifyJwt, createOrder)
router.route("/verify").post(verifyJwt, processOrder)

export default router