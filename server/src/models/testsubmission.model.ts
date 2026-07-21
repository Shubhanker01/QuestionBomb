import { Schema, Types, model } from 'mongoose'
import type { TestSubmissionType } from '../types/testsubmission.js'

const testsubmissionSchema = new Schema<TestSubmissionType>({
    userId: {
        type: Types.ObjectId,
        ref: "users",
        required: true
    },
    mockId: {
        type: Types.ObjectId,
        ref: "mocks",
        required: true
    },
    userScore: {
        type: Number,
        required: true,
    },
    correctQuestions: {
        type: Number,
        required: true
    },
    incorrectQuestions: {
        type: Number,
        required: true
    },
    unattemptedQuestions: {
        type: Number,
        required: true
    },
    userAnswers: {
        type: Map<String, Number>,
        required: true
    },
    analysis: {
        type: String
    }
})

testsubmissionSchema.index({ mockId: 1, userId: 1 })

export const TestSubmission = model("testsubmission", testsubmissionSchema)