import { Types } from "mongoose";
import { Request } from "express";

export interface IUser {
    name: string,
    email: string,
    tokenIssuedAt: number,
    tokenExpiredAt: number,
    avatar: string,
    isPaidUser: boolean,
    mocksAttempted:
    {
        mockId: Types.ObjectId,
        status: "progress" | "completed",
        score: number
    }[]
    ,
    refreshToken: string
}

export interface UserAccessPayload {
    _id: string,
    email: string
}

export interface AuthenticatedUser extends Request {
    user: UserAccessPayload
}