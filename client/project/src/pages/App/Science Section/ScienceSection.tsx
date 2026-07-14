import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Sparkles
} from "lucide-react";
import { showScienceMocks } from "@/services/mocks";
import type { ScienceMock } from "@/types/mock";
import MockCard from "@/components/Mock Card/MockCard";


export default function ScienceSection() {
    const [mocks, setMocks] = useState<[ScienceMock] | []>([])
    useEffect(() => {
        async function getScienceMocks() {
            const res = await showScienceMocks()
            const json = res?.data
            setMocks(json.mocks)
        }
        getScienceMocks()
    }, [])
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const categories = ["All", "Physics", "Chemistry", "Biology"];

    const filteredMocks = selectedCategory === "All"
        ? mocks
        : mocks.filter((m) => m.section === selectedCategory);

    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-4">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Practice & Benchmark</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                        Science Mock Tests
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                        Standardized practice tests designed to evaluate core scientific concepts.
                    </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(cat)}
                            className="rounded-full text-xs font-medium"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Grid Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMocks.map((mock) => {
                    return (
                        <MockCard key={mock._id} mock={mock} />
                    );
                })}
            </div>
        </section>
    );
}