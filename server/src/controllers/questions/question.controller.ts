import { Response, Request, RequestHandler } from "express";
import { Question } from "../../models/questions.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import type { AuthenticatedUser } from "../../types/user.js";
import { Mock } from "../../models/mock.model.js";
import { User } from "../../models/user.model.js";

const fetchQuestions = asyncHandler(async (req: AuthenticatedUser, res: Response) => {
    const { mockId, section } = req.params
    const userId = req.user._id
    if (!userId) {
        res.status(400).json({ message: "Some error occured!!!" })
        return
    }
    if (!mockId || !section) {
        res.status(400).json({ message: "Bad Request!!!" })
        return
    }
    const user = await User.findById(userId)
    const mock = await Mock.findById(mockId)
    if (mock?.isPaid && !user?.isPaidUser) {
        res.status(403).json({ message: "Forbidden" })
    }
    const questions = await Question.find({
        mockId: String(mockId),
        section: String(section)
    }).select("-correctAnswer -explanation")

    if (!questions) {
        res.status(404).json({ message: "No questions found regarding particular mock" })
        return
    }
    res.status(200).json({ message: "Questions fetched successfully", questions, count: questions.length })
})


export { fetchQuestions }