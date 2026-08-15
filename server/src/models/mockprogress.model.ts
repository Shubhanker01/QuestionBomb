import { Schema, Types, model } from 'mongoose'

import type { IMockProgress } from '../types/mockProgress.js'

const mockprogressSchema = new Schema<IMockProgress>({
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
    status: {
        type: String,
        enum: ['in_progress', 'completed'],
        default: 'in_progress'
    },
    startedAt: {
        type: Date,
        default: Date.now()
    },
    lastSavedAt: {
        type: Date,
        default: Date.now()
    },
    userAnswers: {
        type: Map,
        default: {}
    }

}, { timestamps: true })

mockprogressSchema.index({ userId: 1, mockId: 1 }, { unique: true })

export const MockProgress = model<IMockProgress>("mockprogress", mockprogressSchema)