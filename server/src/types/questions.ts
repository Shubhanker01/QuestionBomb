import { Types } from "mongoose"
export interface IQuestion {
    questionTitle: string,
    options: object[],
    correctAnswer: number,
    mockId: Types.ObjectId,
    section: string,
    subjectId: number,
    explanation:string
}
