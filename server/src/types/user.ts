import { Types } from "mongoose";

export interface IUser {
    name: string,
    email: string,
    tokenIssuedAt: number,
    tokenExpiredAt: number,
    avatar: string,
    isPaidUser: boolean,
    mocksAttempted: Types.ObjectId[]
}