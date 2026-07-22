import type { Dispatch, SetStateAction } from "react";

export interface ScienceMock {
    _id: string;
    mockTitle: string;
    section: "Physics" | "Chemistry" | "Biology";
    subsection: string;
    noOfQuestions: number;
    duration: number;
    difficultyLevel: "Easy" | "Medium" | "Hard";
    description: string;
    isAttempted: boolean,
    userScore: number
    icon: React.ComponentType<{ className?: string }>;
}

export interface SubmitContextType {
    isSubmitting: boolean,
    setIsSubmitting: Dispatch<SetStateAction<boolean>>
}

export interface MockType {
    mockTitle: string,
    subject: "Science" | "Geography" | "Polity",
    section: string,
    subsection: string
}

export interface MockContextType {
    mockInfo: MockType | null,
    setmockInfo: Dispatch<SetStateAction<MockType | null>>
}

export interface JSONResultResponseType {
    score: number,
    noOfCorrectQuestion: number,
    noOfIncorrectQuestion: number,
    noOfUnattemptedQuestion: number,
    rank: number,
    totalParticipants: number,
    percentile: number
}