import { Schema, Types, model } from "mongoose";
import { IQuestion } from "../types/questions.js";

const questionSchema = new Schema<IQuestion>({
    questionTitle: {
        type: String,
        required: true
    },
    options: {
        type: [Object],
        required: true
    },
    correctAnswer: {
        type: Number,
        required: true
    },
    mockId: {
        type: Types.ObjectId,
        ref: "mocks",
        required: true
    },
    section: {
        type: String,
        required: true
    },
    subjectId: {
        type: Number,
        ref: "mocks",
        required: true
    },
    explanation: {
        type: String
    }
})

questionSchema.index({ mockId: 1, section: 1 })

export const Question = model<IQuestion>("question", questionSchema)