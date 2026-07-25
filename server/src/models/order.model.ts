import { Schema, model } from 'mongoose'

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    razorpayOrderId: {
        type: String,
        unique: true,
        required: true
    },
    razorpayPaymentId: {
        type: String,
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: "INR"
    },
    status: {
        type: String,
        enum: ["created", "paid", "failed"],
        default: "created"
    }
}, { timestamps: true })

export const Order = model("order", orderSchema)