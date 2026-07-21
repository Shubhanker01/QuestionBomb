// controller for mocks
import { Request, Response } from 'express';
import { Mock } from '../../models/mock.model.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { isObjectEmpty } from '../../utils/isObjectEmpty.js';
import { Question } from '../../models/questions.model.js';
import { User } from '../../models/user.model.js';
import { TestSubmission } from '../../models/testsubmission.model.js';
import { AuthenticatedUser } from '../../types/user.js';
import { Types } from 'mongoose';

export const showScienceMocks = asyncHandler(async (req: AuthenticatedUser, res: Response) => {
    const userId = req.user._id
    if (!userId) {
        return res.status(400).json({ message: "User Id is required!!!" })
    }
    const mocks = await Mock.aggregate([
        // filter by subject id
        {
            $match: { subjectId: 1 }
        },

        // 2. Lookup ONLY for the current user's document
        {
            $lookup: {
                from: "users",
                // define local variable current mock id
                let: { currentMockId: "$_id" },
                // pipeline runs through every mock
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    // Match the logged-in user specifically
                                    { $eq: ["$_id", new Types.ObjectId(userId)] },
                                    // Check if this mock ID exists inside their mocksAttempted array
                                    { $in: ["$$currentMockId", "$mocksAttempted.mockId"] }
                                ]
                            }
                        }
                    },
                    // Only return the mocksAttempted field (keeps query fast & secure)
                    { $project: { mocksAttempted: 1 } }
                ],
                as: "userAttempt"
            }
        },

        // 3. Add easy-to-use fields for frontend UI
        {
            $addFields: {
                // check how many items returned
                isAttempted: { $gt: [{ $size: "$userAttempt" }, 0] },

                // Extract the exact attempt details (score, date) for THIS mock
                userScore: {
                    $let: {
                        vars: {
                            // Find the specific object in mocksAttempted array matching this mock's _id
                            matchedAttempt: {
                                $arrayElemAt: [
                                    {
                                        $filter: {
                                            input: {
                                                $arrayElemAt: ["$userAttempt.mocksAttempted", 0]
                                            },
                                            as: "item",
                                            cond: { $eq: ["$$item.mockId", "$_id"] }
                                        }
                                    },
                                    0
                                ]
                            }
                        },
                        in: "$$matchedAttempt.score" // Extract score (or return null if unattempted)
                    }
                }
            }
        },

        // 4. Remove the raw user object array from final output
        {
            $project: {
                userAttempt: 0
            }
        }

    ])
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
        let noOfUnattemptedQuestion = 0
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
        noOfUnattemptedQuestion = questions.length - noOfCorrectQuestion - noOfIncorrectQuestion
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
        await TestSubmission.create({
            mockId: mockId,
            userId: userId,
            userScore: score,
            correctQuestions: noOfCorrectQuestion,
            incorrectQuestions: noOfIncorrectQuestion,
            unattemptedQuestions: noOfUnattemptedQuestion,
            userAnswers: userAnswers,
            analysis: ""
        })
        res.status(200).json({ score: score, noOfCorrectQuestion, noOfIncorrectQuestion, noOfUnattemptedQuestion })
    } catch (error) {
        console.log(error)
    }
})
