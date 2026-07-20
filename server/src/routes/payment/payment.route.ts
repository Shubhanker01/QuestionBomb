import Router from 'express'
import { createOrder, processOrder } from '../../controllers/Payment/payment.controller.js'

const router = Router()

router.route("/order").post(createOrder)
router.route("/verify").post(processOrder)

export default router