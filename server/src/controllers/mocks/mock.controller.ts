// controller for mocks
import { Request, Response } from 'express';
import { Mock } from '../../models/mock.model.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { isObjectEmpty } from '../../utils/isObjectEmpty.js';
import { Question } from '../../models/questions.model.js';
import { User } from '../../models/user.model.js';
import mongoose from 'mongoose'

export const showScienceMocks = asyncHandler(async (req: Request, res: Response) => {
    const mocks = await Mock.find({ subjectId: 1 })
    if (!mocks) {
        return res.status(404).json({ message: "Mocks not found!!!" })
    }
    return res.status(200).json({ message: "Mocks retreived successfully!!!", mocks })
})

export const submitMock = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { mockId, userId }: any = req.params
        let { userAnswers }: any = req.body
        userAnswers = JSON.parse(userAnswers)
        if (isObjectEmpty(userAnswers)) {
            res.status(200).json({ score: 0 })
            return
        }
        let questions = await Question.find({ mockId: mockId })

        let answerKeys: any = {}
        questions.map((question, idx) => {
            answerKeys[String(idx + 1)] = question.correctAnswer
        })
        let score = 0
        let noOfCorrectQuestion = 0
        let noOfIncorrectQuestion = 0
        for (let key of Object.keys(userAnswers)) {
            if (userAnswers[key] == answerKeys[key]) {
                score += 0.83
                noOfCorrectQuestion++
            }
            else {
                score -= 0.27
                noOfIncorrectQuestion++
            }
        }
        // update user mocks given
        const user = await User.findById(userId)
        if (!user) {
            console.log("User not found!!!")
            res.status(404).json({ message: "User not found!!!" })
            return
        }
        user?.mocksAttempted.push({
            mockId: mockId,
            status: "completed",
            score: score
        })
        await user.save()
        res.status(200).json({ score: score, noOfCorrectQuestion, noOfIncorrectQuestion })
    } catch (error) {
        console.log(error)
    }
})
