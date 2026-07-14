import { Badge } from "@/components/ui/badge"
import type { ScienceMock } from "@/types/mock";

export const getDifficultyBadge = (difficulty: ScienceMock["difficultyLevel"]) => {
    switch (difficulty) {
        case "Easy":
            return <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/25">Easy</Badge>;
        case "Medium":
            return <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20 hover:bg-amber-500/25">Medium</Badge>;
        case "Hard":
            return <Badge className="bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/20 hover:bg-rose-500/25">Hard</Badge>;
    }
};
