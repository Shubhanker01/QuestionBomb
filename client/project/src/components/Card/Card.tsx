
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

export function CardSmall({ title, userId }: any) {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/main-app/${userId}/${title}`)
    }
    return (
        <Card size="sm" className="w-full max-w-xs">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    Go to {title} section and see where your preparation is
                </CardDescription>
            </CardHeader>
            <CardContent>

            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button size="sm" className="w-full" onClick={handleNavigate}>
                    Go to {title}
                </Button>
            </CardFooter>
        </Card>
    )
}
