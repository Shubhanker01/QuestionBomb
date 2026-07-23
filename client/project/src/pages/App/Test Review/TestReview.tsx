import { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  BookOpen, 
  Lightbulb, 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft,
  Filter 
} from 'lucide-react';

// Shadcn UI primitives
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QuestionReview {
  id: string;
  questionNumber: number;
  subject: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  userOptionIndex: number | null;
  explanation: {
    overview: string;
    keyConcept: string;
    commonTrap?: string;
  };
}

const mockQuestions: QuestionReview[] = [
  {
    id: 'q1',
    questionNumber: 1,
    subject: 'Physics',
    questionText: 'A ball is thrown vertically upward with a velocity of 20 m/s. What is the maximum height reached by the ball? (Take g = 10 m/s²)',
    options: ['10 meters', '20 meters', '30 meters', '40 meters'],
    correctOptionIndex: 1,
    userOptionIndex: 1, // Correct
    explanation: {
      overview: 'Using the kinematic equation v² = u² - 2gh. At maximum height, final velocity v = 0. So, 0 = (20)² - 2(10)h => 20h = 400 => h = 20 meters.',
      keyConcept: 'Kinematics in One Dimension (Conservation of Energy)',
    },
  },
  {
    id: 'q2',
    questionNumber: 2,
    subject: 'Physics',
    questionText: 'Which of the following electromagnetic waves has the highest frequency?',
    options: ['Infrared Rays', 'Microwaves', 'Gamma Rays', 'Ultraviolet Rays'],
    correctOptionIndex: 2,
    userOptionIndex: 3, // Incorrect
    explanation: {
      overview: 'Gamma rays have the shortest wavelength and highest frequency in the electromagnetic spectrum, carrying the highest energy per photon.',
      keyConcept: 'Electromagnetic Spectrum Order: Radio < Microwave < IR < Visible < UV < X-ray < Gamma',
      commonTrap: 'Students often confuse Ultraviolet with Gamma rays because UV causes sunburns, but Gamma rays carry far higher frequency.',
    },
  },
  {
    id: 'q3',
    questionNumber: 3,
    subject: 'Chemistry',
    questionText: 'What is the oxidation state of Chromium in Potassium Dichromate (K₂Cr₂O₇)?',
    options: ['+3', '+5', '+6', '+7'],
    correctOptionIndex: 2,
    userOptionIndex: null, // Skipped
    explanation: {
      overview: 'Let oxidation state of Cr be x. K is +1 and O is -2. So, 2(+1) + 2(x) + 7(-2) = 0 => 2 + 2x - 14 = 0 => 2x = 12 => x = +6.',
      keyConcept: 'Redox Reactions & Oxidation Numbers',
    },
  },
];

export default function TestReview() {
  const [selectedQIndex, setSelectedQIndex] = useState(0);
  const [filter, setFilter] = useState<'all' | 'incorrect' | 'correct' | 'unattempted'>('all');

  const activeQuestion = mockQuestions[selectedQIndex];

  const getStatus = (q: QuestionReview) => {
    if (q.userOptionIndex === null) return 'unattempted';
    return q.userOptionIndex === q.correctOptionIndex ? 'correct' : 'incorrect';
  };

  const filteredQuestions = mockQuestions.filter((q) => {
    if (filter === 'all') return true;
    return getStatus(q) === filter;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      
      {/* 1. TOP HEADER BAR */}
      <header className="border-b bg-card px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <h1 className="text-sm font-semibold tracking-tight sm:text-base">Science Sectional Mock 01 — Solutions</h1>
        </div>

        {/* Score Stats Badges */}
        <div className="hidden sm:flex items-center gap-2">
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 gap-1 py-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 1 Correct
          </Badge>
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 gap-1 py-1">
            <XCircle className="w-3.5 h-3.5" /> 1 Incorrect
          </Badge>
          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 gap-1 py-1">
            <AlertCircle className="w-3.5 h-3.5" /> 1 Skipped
          </Badge>
        </div>
      </header>

      {/* 2. MAIN GRID LAYOUT */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        
        {/* LEFT COLUMN: QUESTION REVIEW PANEL (8 COLS) */}
        <main className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Main Question Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <Badge variant="secondary" className="font-semibold uppercase tracking-wider text-[11px]">
                Q{activeQuestion.questionNumber} • {activeQuestion.subject}
              </Badge>

              {/* Status Badge */}
              {getStatus(activeQuestion) === 'correct' && (
                <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/30 gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+2.0)
                </Badge>
              )}
              {getStatus(activeQuestion) === 'incorrect' && (
                <Badge variant="destructive" className="gap-1.5">
                  <XCircle className="w-3.5 h-3.5" /> Incorrect (-0.5)
                </Badge>
              )}
              {getStatus(activeQuestion) === 'unattempted' && (
                <Badge variant="outline" className="bg-amber-500/15 text-amber-600 border-amber-500/30 gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> Skipped (0.0)
                </Badge>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-base font-medium leading-relaxed">
                {activeQuestion.questionText}
              </p>

              {/* Options List */}
              <div className="space-y-2.5">
                {activeQuestion.options.map((option, idx) => {
                  const isCorrectOption = idx === activeQuestion.correctOptionIndex;
                  const isUserChoice = idx === activeQuestion.userOptionIndex;

                  let borderClass = "border-border bg-card";
                  let badge = null;

                  if (isCorrectOption) {
                    borderClass = "border-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100 font-medium";
                    badge = <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">Correct Answer</Badge>;
                  } else if (isUserChoice && !isCorrectOption) {
                    borderClass = "border-destructive bg-destructive/10 text-destructive dark:text-rose-200 font-medium";
                    badge = <Badge variant="destructive">Your Choice</Badge>;
                  }

                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-lg border flex items-center justify-between gap-4 transition-all text-sm ${borderClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      {badge}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Explanation Card */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-primary">
                <BookOpen className="w-4 h-4" /> Detailed Solution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <p className="text-muted-foreground">{activeQuestion.explanation.overview}</p>

              {/* Key Concept Box */}
              <div className="bg-background border rounded-lg p-3.5 flex items-start gap-3 shadow-2xs">
                <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-0.5">Key Concept</h4>
                  <p className="text-xs font-medium text-foreground">{activeQuestion.explanation.keyConcept}</p>
                </div>
              </div>

              {/* Common Pitfall Box */}
              {activeQuestion.explanation.commonTrap && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3.5 flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-0.5">Common Trap</h4>
                    <p className="text-xs font-medium text-foreground">{activeQuestion.explanation.commonTrap}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bottom Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              disabled={selectedQIndex === 0}
              onClick={() => setSelectedQIndex((prev) => prev - 1)}
              className="gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>
            <Button
              disabled={selectedQIndex === mockQuestions.length - 1}
              onClick={() => setSelectedQIndex((prev) => prev + 1)}
              className="gap-1.5"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

        </main>

        {/* RIGHT COLUMN: QUESTION PALETTE & FILTERS (4 COLS) */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <Card className="sticky top-20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold">Question Palette</CardTitle>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Filter className="w-3.5 h-3.5" /> Filter
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Filter Tabs using Shadcn Tabs */}
              <Tabs defaultValue="all" value={filter} onValueChange={(v) => setFilter(v as any)}>
                <TabsList className="grid grid-cols-4 w-full h-8 p-1">
                  <TabsTrigger value="all" className="text-[11px]">All</TabsTrigger>
                  <TabsTrigger value="incorrect" className="text-[11px]">Wrong</TabsTrigger>
                  <TabsTrigger value="correct" className="text-[11px]">Right</TabsTrigger>
                  <TabsTrigger value="unattempted" className="text-[11px]">Skipped</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Grid of Question Buttons */}
              <ScrollArea className="h-64 pr-1">
                <div className="grid grid-cols-5 gap-2">
                  {mockQuestions.map((q, index) => {
                    const status = getStatus(q);
                    const isSelected = index === selectedQIndex;

                    let variant: "outline" | "default" | "destructive" | "secondary" = "outline";
                    let customBg = "";

                    if (status === 'correct') customBg = "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/20";
                    if (status === 'incorrect') customBg = "bg-destructive/10 text-destructive border-destructive/30 hover:bg-destructive/20";
                    if (status === 'unattempted') customBg = "bg-amber-500/10 text-amber-600 border-amber-500/30 hover:bg-amber-500/20";

                    return (
                      <Button
                        key={q.id}
                        variant={variant}
                        onClick={() => setSelectedQIndex(index)}
                        className={`h-9 text-xs font-bold transition-all relative ${customBg} ${
                          isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background font-extrabold scale-105' : ''
                        }`}
                      >
                        {q.questionNumber}
                      </Button>
                    );
                  })}
                </div>
              </ScrollArea>

              <Separator />

              {/* Legend */}
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Correct
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive" /> Incorrect
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Skipped
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

      </div>
    </div>
  );
}