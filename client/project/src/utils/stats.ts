import type { QuestionReview } from "../types/mock"
export function stats(questionReview: QuestionReview[]) {
    let noOfCorrectQuestions = 0
    let noOfIncorrectQuestions = 0
    let noOfUnattemptedQuestions = 0
    questionReview.map((ques: QuestionReview) => {
        if (ques.userAnswer === ques.correctAnswer) {
            noOfCorrectQuestions++
        }
        else if ((ques.userAnswer !== ques.correctAnswer) && (ques.userAnswer !== null)) {
            noOfIncorrectQuestions++
        }
        else {
            noOfUnattemptedQuestions++
        }
    })


    return { noOfCorrectQuestions, noOfIncorrectQuestions, noOfUnattemptedQuestions }
}