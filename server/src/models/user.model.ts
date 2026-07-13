// creating a user model
import { Model, Schema, Types, model } from "mongoose";
import { IUser } from "../types/user.js";
import jwt from "jsonwebtoken";

interface IUserMethods {
    generateAccessToken(): string,
    generateRefreshToken(): string
}

type UserModel = Model<IUser, {}, IUserMethods>
const userSchema = new Schema<IUser, UserModel, IUserMethods>({
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
    ],
    refreshToken: {
        type: String
    }
})

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email
    }, process.env.ACCESS_TOKEN as string, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE as jwt.SignOptions['expiresIn'] })
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email
    }, process.env.REFRESH_TOKEN as string, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE as jwt.SignOptions['expiresIn']
    })
}


export const User = model<IUser, UserModel>("user", userSchema)