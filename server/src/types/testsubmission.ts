import { Types } from 'mongoose'

export interface TestSubmissionType {
    userId: Types.ObjectId,
    mockId: Types.ObjectId,
    userScore: number,
    correctQuestions: number,
    incorrectQuestions: number,
    unattemptedQuestions: number,
    userAnswers: Record<string, number>,
    analysis: string
}