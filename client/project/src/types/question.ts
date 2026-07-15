import type { Dispatch, SetStateAction } from "react";

export interface Option {
    id: number;
    option: string;
}

export interface Question {
    index: number,
    _id: string;
    questionTitle: string;
    options: Option[];
}

export interface TimerProps {
    timeLeft: number,
    setTimeLeft: Dispatch<SetStateAction<number>>,
}

export interface Pagination {
    currentIdx: number,
    length: number
}

export interface FooterProps {
    currentIdx: number,
    setCurrentIdx: Dispatch<SetStateAction<number>>,
    length: number
}

export interface QuestionPaletteProps {
    selectedAnswers: Record<number, number>,
    markedForReview: Record<number, boolean>,
    currentQuestion: Question,
    setCurrentIdx: Dispatch<SetStateAction<number>>,
    questions: Question[]
}

export interface QuestionCardProps {
    currentIdx: number,
    selectedAnswers: Record<number, number>,
    setSelectedAnswers: Dispatch<SetStateAction<Record<number, number>>>,
    markedForReview: Record<number, boolean>,
    setMarkedForReview: Dispatch<SetStateAction<Record<number, boolean>>>,
    currentQuestion: Question
}




