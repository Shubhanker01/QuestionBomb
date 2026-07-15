export interface IMock {
    mockTitle: string,
    noOfQuestions: number,
    subjectId: number,
    duration: number,
    difficultyLevel: string,
    section: string,
    subsection: string,
    description: string
}

export interface UserAnswers {
    userAnswers: Record<number, number>
}

export interface QuestionWithIndex {
    index: number,
    _id: string,
    correctAnswer: number
}