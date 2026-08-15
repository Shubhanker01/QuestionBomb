// controller for mocks
import { Request, Response } from 'express';
import { Mock } from '../../models/mock.model.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { isObjectEmpty } from '../../utils/isObjectEmpty.js';
import { Question } from '../../models/questions.model.js';
import { User } from '../../models/user.model.js';
import { TestSubmission } from '../../models/testsubmission.model.js';
import { AuthenticatedUser } from '../../types/user.js';
import mongoose, { Types } from 'mongoose';
import { redis } from '../../db/connectToRedis.js';
import { MockProgress } from '../../models/mockprogress.model.js';

type PipelineResult = [
    [Error | null, number],
    [Error | null, number | null],
    [Error, number]
]


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
        // {
        //     $addFields: {
        //         mocksGiven: { $arrayElemAt: ["$userAttempt.mocksAttempted", 0] }
        //     }
        // },
        // {
        //     $addFields: {
        //         inProgress: {
        //             $filter: {
        //                 input: "$mocksGiven",
        //                 as: "mocksGiven",
        //                 cond: {
        //                     $and: [
        //                         { $eq: ["$$mocksGiven.mockId", "_id"] },
        //                         { $eq: ["$$mocksGiven.status", "in_progress"] }
        //                     ]
        //                 }
        //             }
        //         }
        //     }
        // }


        // 4. Remove the raw user object array from final output
        {
            $project: {
                userAttempt: 0
            }
        }

    ])
    console.log(mocks)
    if (!mocks) {
        return res.status(404).json({ message: "Mocks not found!!!" })
    }
    return res.status(200).json({ message: "Mocks retreived successfully!!!", mocks })
})

export const getOrStartMockSession = asyncHandler(async (req: AuthenticatedUser, res: Response) => {
    try {
        const userId = req.user?._id?.toString()
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized Request" })
        }
        const { mockId } = req.params
        if (!mockId || !mongoose.Types.ObjectId.isValid(mockId as string)) {
            return res.status(400).json({ success: false, message: "Mock Id is required!!!" })
        }
        const mock = await Mock.findById(mockId)
        if (!mock) {
            return res.status(404).json({
                success: false,
                message: "Mock test not found!!!"
            })
        }
        let session = await MockProgress.findOne({ userId, mockId })
        if (session && session.status === 'completed') {
            return res.status(400).json({
                success: false,
                message: "You have already completed this test",
            })
        }
        if (!session) {
            session = await MockProgress.create({
                userId: userId,
                mockId: String(mockId),
                status: "in_progress",
                startedAt: Date.now(),
                userAnswers: {}
            })
            const user = await User.findById(userId)
            user?.mocksAttempted.push({
                mockId: new mongoose.Types.ObjectId(mockId as string),
                status: "in_progress",
                score: 0
            })
            await user?.save()
        }
        const totalDurationInSeconds = (mock.duration || 60) * 60;
        const secondsElapsed = Math.floor((Date.now() - new Date(session?.startedAt).getTime()) / 1000);
        const timeRemainingInSeconds = Math.max(0, totalDurationInSeconds - secondsElapsed);
        return res.status(200).send({
            success: true,
            message: "Mock progress session created!!!",
            mockId: mockId,
            status: session.status,
            startedAt: session.startedAt,
            timeRemainingInSeconds,
            userAnswers: session.userAnswers || {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error occured" })
    }
})

export const submitMock = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { mockId, userId }: any = req.params
        let { userAnswers }: any = req.body
        userAnswers = JSON.parse(userAnswers)
        // if (isObjectEmpty(userAnswers)) {
        //     res.status(200).json({ score: 0 })
        //     return
        // }
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
        user.mocksAttempted = user.mocksAttempted.filter((mock) => {
            if (mock.mockId === mockId && mock.status === 'in_progress') {
                mock.status = "completed";
                mock.score = score;
            }
            return mock;
        })
        await user.save()
        // update mock progress
        await MockProgress.findOneAndUpdate({ userId, mockId }, {
            status: "completed",
            userAnswers: userAnswers
        })
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

        // get rank 
        const leaderboardKey = `leaderboard:mock:${mockId}`
        const maxTimestamp = 1893456000000; // Year 2030 in ms
        const currentTimestamp = Date.now();
        const tieBreaker = (maxTimestamp - currentTimestamp) / maxTimestamp;
        const compositeScore = score + tieBreaker;

        // creating redis pipeline
        const pipeline = redis.pipeline()
        pipeline.zadd(leaderboardKey, compositeScore, userId)
        pipeline.zrevrank(leaderboardKey, userId)
        pipeline.zcard(leaderboardKey)
        const results = (await pipeline.exec()) as unknown as PipelineResult
        console.log(results)
        if (!results) {
            res.status(500).json({ message: "Some internal server error occured!!!" })
            return
        }
        // ranking
        const zeroBasedRank = results[1][1]
        const totalParticipants = results[2][1]
        const actualRank = zeroBasedRank !== null ? zeroBasedRank + 1 : null
        if (actualRank == null) {
            res.status(500).json({ message: "Some internal server error occured!!!" })
            return
        }
        const percentile = Number((((totalParticipants - actualRank) / totalParticipants) * 100).toFixed(1))
        res.status(200).json({ score: score, noOfCorrectQuestion, noOfIncorrectQuestion, noOfUnattemptedQuestion, rank: actualRank, totalParticipants, percentile })
    } catch (error) {
        console.log(error)
    }
})

// fetch leaderboard
export const getLeaderboard = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { mockId } = req.params
        const leaderboardKey = `leaderboard:mock:${mockId}`
        const rawResults = await redis.zrevrange(leaderboardKey, 0, 4, "WITHSCORES")
        console.log(rawResults)
        if (!rawResults || rawResults.length == 0) {
            return res.status(200).json({
                success: true,
                leaderboard: []
            })
        }

        const userIds: string[] = []
        const scoreMap: Record<string, number> = {}
        for (let i = 0; i < rawResults.length; i += 2) {
            const uId = rawResults[i]
            const score = Math.floor(parseFloat(rawResults[i + 1]))
            userIds.push(uId)
            scoreMap[uId] = score
        }
        const users = await User.find({ _id: { $in: userIds } }).select("name").lean()
        const userMap = new Map(users.map((u) => [u._id.toString(), u]))
        const leaderboard = userIds.map((id, index) => {
            const userInfo = userMap.get(id)
            return {
                rank: index + 1,
                userId: id,
                name: userInfo?.name,
                score: scoreMap[id]
            }
        })
        return res.status(200).json({
            success: true,
            leaderboard
        })

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve leaderboard"
        })
    }
})
