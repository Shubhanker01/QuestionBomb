import { CardSmall } from "@/components/Card/Card"
import { useParams } from "react-router-dom"
function Home() {
    const { userId } = useParams();
    const menuItems = [
        {
            title: "Science",
            path: "/science"
        },
        {
            title: "Geography",
            path: "/geography"
        }
    ]
    return (
        <div>
            <div className="m-8">
                <h1 className="text-2xl">Go to Practice</h1>
                <div className="grid grid-cols-3 m-3">
                    {
                        menuItems.map((item) => {
                            return <CardSmall key={item.title} title={item.title} userId={userId} />
                        })
                    }
                </div>
            </div>
            <div className="m-8">
                <h1 className="text-2xl">Your Test Stats</h1>

            </div>
        </div>
    )
}

export default Home