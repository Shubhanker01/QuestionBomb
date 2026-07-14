import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import type { UserAccessPayload, AuthenticatedUser } from "../types/user.js";

export const verifyJwt = asyncHandler(async (req: AuthenticatedUser, res: Response, next: NextFunction) => {
    const token: string = req?.cookies?.refreshToken || req.header('Authorization')?.replace("Bearer", "")
    if (!token) {
        res.status(401).json({ message: "Token is not present" })
        throw new Error("Token is not present")
    }
    try {
        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN as string) as UserAccessPayload
        const user = await User.findById(decodedToken._id).select("-refreshToken -mocksAttempted -isPaidUser -avatar -tokenIssuedAt -tokenExpiredAt -name")
        if (!user) {
            res.status(401).json({ message: "Invalid Token" })
            throw new Error("Invalid Token")
        }
        req.user = {
            _id: String(user._id),
            email: user.email
        }
        next()
    } catch (error) {
        console.log(error)

    }
})