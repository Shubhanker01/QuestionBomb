import { useState } from "react"
import { Button } from "@/components/ui/button"
import { createOrderForClient, processOrderForClient } from "@/services/payment"

function Payment() {
    const [loading, setLoading] = useState(false)
    const handlePayment = async () => {
        setLoading(true)
        try {
            const response = await createOrderForClient("mock")
            const json = await response?.data
            console.log(json)
            if (json.success === true) {
                const options = {
                    key: json.key_id,
                    amount: json.amount,
                    currency: 'INR',
                    name: 'Question Bomb',
                    description: "Premium exam practice test questions",
                    order_id: json.order_id,
                    handler: async function (response: any) {
                        const verificationResponse = await processOrderForClient({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        })
                        const res = await verificationResponse?.data
                        if (res.success) {
                            alert("Access granted to mock test!!!")
                            window.location.href = '/'
                        }
                        else {
                            alert("Verification failed!!!")
                        }
                    },
                    prefill: {
                        name: "Test user",
                        email: "shubhanker263@gmail.com"
                    },
                    theme: {
                        color: "#0f172a"
                    }
                }
                const rzp = new (window as any).Razorpay(options)
                rzp.open()
            }
        } catch (error) {
            console.log(error)
            alert("Something went wrong with the checkout process!!!")
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <Button
                onClick={handlePayment}
                disabled={loading}
                className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-sm"
            >
                {loading ? "Processing..." : "Buy Premium Access"}
            </Button>
        </div>
    )
}

export default Payment