import { api } from "./api";

export const createOrderForClient = async (planId: string) => {
    try {
        const res = await api.post(`/payment/order`, { planId: planId })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const processOrderForClient = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }: any) => {
    try {
        const res = await api.post('/payment/verify', {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        })
        return res
    } catch (error) {
        console.log(error)
    }
}