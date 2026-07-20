// controller for ai analysis
import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv'
import { asyncHandler } from "../../utils/asyncHandler.js";
dotenv.config()
import { takePrompt } from "../../utils/prompt.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

const generateAIAnalysis = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { subject, totalScore, maxMarks, accuracy, section, subsection, title } = req.body
        const prompt = takePrompt(subject, totalScore, maxMarks, accuracy, title, section, subsection)

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        })
        res.status(200).json({
            success: true,
            analysis: response.text
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to generate AI analysis. Please try again."
        });
    }
})

export { generateAIAnalysis }