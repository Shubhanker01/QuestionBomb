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
    icon: React.ComponentType<{ className?: string }>;
}

export interface SubmitContextType {
    isSubmitting: boolean,
    setIsSubmitting: Dispatch<SetStateAction<boolean>>
}
