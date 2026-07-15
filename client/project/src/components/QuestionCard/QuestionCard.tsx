import { ScrollArea } from '../ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge'
import { Bookmark } from 'lucide-react'
import type { QuestionCardProps } from '@/types/question';

function QuestionCard({ setSelectedAnswers, setMarkedForReview, currentQuestion, markedForReview, currentIdx, selectedAnswers }: QuestionCardProps) {
    const handleOptionSelect = (optionId: number) => {
        setSelectedAnswers((prev) => ({ ...prev, [currentQuestion.index]: optionId }));
    };

    const toggleMarkForReview = () => {
        setMarkedForReview((prev) => ({
            ...prev,
            [currentQuestion.index]: !prev[currentQuestion.index],
        }));
    };

    const handleClearResponse = () => {
        setSelectedAnswers((prev) => {
            const copy = { ...prev };
            delete copy[currentQuestion.index];
            return copy;
        });
    };


    return (
        <ScrollArea className="flex-1 p-6">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Question Card */}
                <Card className="border-border/60 shadow-sm">
                    <CardHeader className="pb-3">
                        <div className="flex justify-between items-center mb-2">
                            <Badge variant="secondary" className="text-xs font-medium">
                                Multiple Choice Question
                            </Badge>
                            {/* <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleMarkForReview}
                                className={`gap-1.5 text-xs ${markedForReview[currentQuestion.index] ? "text-amber-500" : "text-muted-foreground"
                                    }`}
                            >
                                <Bookmark className="w-4 h-4" />
                                {markedForReview[currentQuestion.index] ? "Marked" : "Mark for Review"}
                            </Button> */}
                        </div>
                        <CardTitle className="text-base md:text-lg font-medium leading-relaxed">
                            Q{currentIdx + 1}. {currentQuestion.questionTitle}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 pt-2">
                        {currentQuestion.options.map((opt: any) => {
                            const isSelected = selectedAnswers[currentQuestion.index] === opt.id;
                            return (
                                <button
                                    key={opt.id}
                                    onClick={() => handleOptionSelect(opt.id)}
                                    className={`w-full flex items-start gap-3 p-4 rounded-xl text-left transition-all border ${isSelected
                                        ? "border-primary bg-primary/5 shadow-sm text-foreground"
                                        : "border-border/70 hover:border-border hover:bg-accent/40 text-muted-foreground"
                                        }`}
                                >
                                    <span
                                        className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 ${isSelected
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        {opt.id}
                                    </span>
                                    <span className="text-sm pt-0.5 font-normal text-foreground">
                                        {opt.option}
                                    </span>
                                </button>
                            );
                        })}
                    </CardContent>

                    {selectedAnswers[currentQuestion.index] && (
                        <CardFooter className="pt-0 justify-end">
                            <Button
                                variant="link"
                                size="sm"
                                onClick={handleClearResponse}
                                className="text-xs text-muted-foreground hover:text-destructive p-0 h-auto"
                            >
                                Clear Choice
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            </div>
        </ScrollArea>
    )
}

export default QuestionCard