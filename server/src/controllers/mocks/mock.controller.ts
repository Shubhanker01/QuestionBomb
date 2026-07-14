// controller for mocks
import { Request, Response } from 'express';
import { Mock } from '../../models/mock.model.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

export const showScienceMocks = asyncHandler(async (req: Request, res: Response) => {
    const mocks = await Mock.find({ subjectId: 1 })
    if (!mocks) {
        return res.status(404).json({ message: "Mocks not found!!!" })
    }
    return res.status(200).json({ message: "Mocks retreived successfully!!!", mocks })
})