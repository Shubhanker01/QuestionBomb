import { Schema, model } from "mongoose";

import { IMock } from "../types/mock.js";

const mockSchema = new Schema<IMock>({
    mockTitle: {
        type: String,
        required: true
    },
    noOfQuestions: {
        type: Number,
        required: true
    },
    subjectId: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    difficultyLevel: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    subsection: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

export const Mock = model<IMock>("mock", mockSchema)