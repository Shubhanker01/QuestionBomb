import mongoose from 'mongoose'
export const connectToDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI as string)
        if (connection) {
            console.log("Mongoose successfully connected")
        }
    } catch (error) {
        console.log(error)
    }
}