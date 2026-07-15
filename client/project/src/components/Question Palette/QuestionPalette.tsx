import { ScrollArea } from "../ui/scroll-area"
import type { QuestionPaletteProps } from "@/types/question";

function QuestionPalette({ selectedAnswers, markedForReview, currentQuestion, setCurrentIdx, questions }: QuestionPaletteProps) {
  const getQuestionStatus = (qId: number) => {
    const isAnswered = selectedAnswers[qId] !== undefined;
    const isMarked = markedForReview[qId];

    if (isAnswered && isMarked) return "bg-purple-600 text-white border-purple-600";
    if (isAnswered) return "bg-emerald-600 text-white border-emerald-600";
    if (isMarked) return "bg-amber-500 text-white border-amber-500";
    if (qId === currentQuestion.index) return "border-2 border-primary text-primary bg-primary/10";
    return "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground";
  };
  return (
    <div className="p-5">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
        Question Palette
      </h3>
      <ScrollArea className="h-[calc(100vh-320px)] pr-2">
        <div className="grid grid-cols-5 gap-2.5">
          {questions.map((q, idx) => (
            <button
              key={q._id}
              onClick={() => setCurrentIdx(idx)}
              className={`h-10 w-10 rounded-lg text-xs font-semibold transition-all flex items-center justify-center border ${getQuestionStatus(
                idx + 1
              )}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default QuestionPalette