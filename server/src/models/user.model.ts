// creating a user model
import { Schema, Types, model } from "mongoose";
import { IUser } from "../types/user.js";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    tokenIssuedAt: {
        type: Number
    },
    tokenExpiredAt: {
        type: Number
    },
    avatar: {
        type: String
    },
    isPaidUser: {
        type: Boolean,
        default: false
    },
    mocksAttempted: [
        { type: Schema.Types.ObjectId, ref: "mocks" }
    ]
})

export const User = model<IUser>("user", userSchema)