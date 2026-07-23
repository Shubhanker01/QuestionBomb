import { TestSubmission } from "../../models/testsubmission.model.js";
import { User } from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Request, Response } from "express";

export const reviewMock = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { userId, mockId } = req.params
        const user = await User.findById(String(userId))
        if (!user) {
            return res.status(404).json({
                message: "Some error occured fetching user!!!"
            })
        }
        const attemptedTest = await TestSubmission.findOne({ userId: String(userId), mockId: String(mockId) })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error Occured!!!"
        })
    }
})