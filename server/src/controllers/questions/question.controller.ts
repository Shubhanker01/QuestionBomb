import { Response, Request, RequestHandler } from "express";
import { Question } from "../../models/questions.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const fetchQuestions = asyncHandler(async (req: Request, res: Response) => {
    const { mockId, section } = req.params
    if (!mockId || !section) {
        res.status(400).json({ message: "MockId or section not found!!!" })
        return
    }
    const questions = await Question.find({
        mockId: mockId,
        section: section
    }).select("-correctAnswer")
    if (!questions) {
        res.status(404).json({ message: "No questions found regarding particular mock" })
        return
    }
    res.status(200).json({ message: "Questions fetched successfully", questions, count: questions.length })
})


export { fetchQuestions }