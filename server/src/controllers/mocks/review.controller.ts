import { TestSubmission } from "../../models/testsubmission.model.js";
import { User } from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Request, Response } from "express";
import { Question } from "../../models/questions.model.js";
import type { AuthenticatedUser } from "../../types/user.js";

type QuestionWithUserAnswers = {
    _id: string,
    title: string,
    options: object[],
    correctAnswer: number,
    userAnswer: number | null,
    explanation: string
}

export const reviewMock = asyncHandler(async (req: AuthenticatedUser, res: Response) => {
    try {
        const userId = req?.user?._id.toString()
        const { section, mockId } = req.params
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({
                message: "Bad request!!!"
            })
        }
        const attemptedTest = await TestSubmission.findOne({ userId: userId, mockId: String(mockId) }).lean()
        if (!attemptedTest) {
            return res.status(404).json({
                message: "Some error occured while fetching attempted test!!!"
            })
        }
        const questions = await Question.find({
            mockId: mockId,
            section: section
        })
        if (!questions) {
            return res.status(404).json({
                message: "Some error occured while fetching questions!!!"
            })
        }

        let questionWithUserAnswers: QuestionWithUserAnswers[] = []
        questions.map((ques, idx) => {
            let q = {
                _id: ques?._id.toString(),
                questionNumber: idx + 1,
                title: ques?.questionTitle,
                options: ques?.options,
                correctAnswer: ques?.correctAnswer,
                userAnswer: attemptedTest?.userAnswers[String(idx + 1)] || null,
                explanation: ques?.explanation
            }
            questionWithUserAnswers.push(q)
        })
        return res.status(200).json({
            message: "Question with answers fetched successfully!!!",
            questionWithUserAnswers
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error Occured!!!"
        })
    }
})