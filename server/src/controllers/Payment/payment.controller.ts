import Razorpay from 'razorpay'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { Response } from 'express'
import type { AuthenticatedUser } from '../../types/user.js'
import crypto from 'crypto'
import dotenv from 'dotenv'
import { User } from '../../models/user.model.js'
dotenv.config()
import { Order } from '../../models/order.model.js'

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const createOrder = asyncHandler(async (req: AuthenticatedUser, res: Response) => {
    try {
        const userId = req?.user?._id.toString()
        if (!userId) {
            return res.status(403).json({
                success: false,
                message: "Forbidden!!!"
            })
        }
        const { planId }: any = req.body
        let amount = 0
        if (planId == "mock") {
            amount = 75 * 100
        }
        else {
            res.status(400).json({
                success: false,
                message: "Invalid plan selected!!!"
            })
            return
        }
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: `rcpt_${userId.slice(-6)}_${Date.now()}`,
            notes: {
                userId: userId,
                planId: planId
            }
        }
        const order = await razorpay.orders.create(options)
        if (!order || !order.id) {
            return res.status(500).json({
                success: false,
                message: "Some server error occured while creating order!!!"
            })
        }
        const userOrder = await Order.create({
            userId: userId,
            razorpayOrderId: order.id,
            amount: Number(order.amount),
            currency: "INR",
            status: "created"
        })
        if (!userOrder) {
            res.status(500).json({
                success: false,
                message: "Some server error occured while creating order!!!"
            })
            return
        }
        res.status(200).json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            key_id: process.env.RAZORPAY_KEY_ID
        })
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Some server error occured while creating order!!!"
        })
        return
    }
})

export const processOrder = asyncHandler(async (req: AuthenticatedUser, res: Response) => {
    try {
        const userId = req?.user?._id?.toString()
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Request"
            })
        }
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature }: any = req.body
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            res.status(400).json({
                success: false,
                message: "Correct format is not present!!!"
            })
            return
        }
        const sign = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
            .update(sign.toString())
            .digest('hex')

        const userOrder = await Order.findOne({
            razorpayOrderId: razorpay_order_id,
            userId: userId,
            status: "created"
        })
        if (!userOrder) {
            res.status(404).json({
                success: false,
                message: "User ID not found!!!"
            })
            return
        }
        // convert hex strings to buffer
        const razorpaySignBuffer = Buffer.from(razorpay_signature)
        const expectedSignBuffer = Buffer.from(expectedSign)
        const isSignatureValid = razorpaySignBuffer.length === expectedSignBuffer.length && crypto.timingSafeEqual(razorpaySignBuffer, expectedSignBuffer)
        if (!isSignatureValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid Payment Signature!!!"
            })
        }

        userOrder.razorpayPaymentId = razorpay_payment_id
        userOrder.status = "paid"
        await userOrder.save()
        await User.findByIdAndUpdate(userId, {
            isPaidUser: true
        })
        return res.status(200).json({
            success: true,
            message: "Your payment is verified successfully!!!"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error Occured Processing Payment!!"
        })
    }
})