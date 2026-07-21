export interface AIAnalysisInput {
    userId: string | undefined,
    mockId: string | undefined,
    subject: string,
    totalScore: number,
    maxMarks: number,
    accuracy: number,
    section: string,
    subsection: string
}