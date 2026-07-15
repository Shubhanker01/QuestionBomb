import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import { HelpCircle, Clock } from "lucide-react";
import { getDifficultyBadge } from "../Badges/getDifficultyBadge";
import StartTestDialog from "../ui/Dialog box/StartTestDialog";

export default function MockCard({ mock }: any) {
    return (
        <div key={mock._id}>
            <Card
                className="group flex flex-col justify-between hover:shadow-lg transition-all duration-300 border-border/80 hover:border-primary/50 relative overflow-hidden"
            >
                <div>
                    {/* Header Section */}
                    <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">

                            </div>
                            {getDifficultyBadge(mock.difficultyLevel)}
                        </div>

                        <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                            {mock.mockTitle}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-xs text-muted-foreground mt-1">
                            {mock.description}
                        </CardDescription>
                    </CardHeader>

                    {/* Metadata Row */}
                    <CardContent className="py-2">
                        <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-muted/50 text-xs font-medium border border-border/50">
                            <div className="flex items-center gap-2 text-foreground/80">
                                <HelpCircle className="w-4 h-4 text-muted-foreground" />
                                <span>{mock.noOfQuestions} Questions</span>
                            </div>

                            <div className="flex items-center gap-2 text-foreground/80">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span>{mock.duration} Mins</span>
                            </div>
                        </div>
                    </CardContent>
                </div>

                {/* Action Footer */}
                <CardFooter className="pt-3">
                    <StartTestDialog section={mock.section} mockId={mock._id} />
                </CardFooter>

            </Card>
        </div>

    );
}