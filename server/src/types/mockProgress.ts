import { Types } from "mongoose";

export interface IMockProgress {
    userId: Types.ObjectId,
    mockId: Types.ObjectId,
    status: string,
    startedAt: Date,
    lastSavedAt: Date,
    userAnswers: object
}