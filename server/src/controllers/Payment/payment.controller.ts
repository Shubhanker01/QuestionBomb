import Razorpay from 'razorpay'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { Request, Response } from 'express'
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { planId }: any = req.body
        let amount = 0
        if (planId == "mock") {
            amount = 75 * 100
        }
        else {
            res.status(400).json({ message: "Invalid plan selected!!!" })
            return
        }
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`
        }
        const order = await razorpay.orders.create(options)
        if (!order) {
            res.status(500).json({ message: "Some server error occured while creating order!!!" })
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
    }
})

export const processOrder = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature }: any = req.body
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            res.status(400).json({ message: "Correct format is not present!!!" })
            return
        }
        const sign = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
            .update(sign.toString())
            .digest('hex')
        if (razorpay_signature === expectedSign) {
            res.status(200).json({
                success: true,
                message: "Payment Verified Successfully!!!"
            })
            return
        }
        res.status(400).json({
            success: false,
            message: "Invalid Payment Signature!!!"
        })
    } catch (error) {
        console.log(error)
    }
})