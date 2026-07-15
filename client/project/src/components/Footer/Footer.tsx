import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight, Send } from 'lucide-react'
import type { FooterProps } from '@/types/question'

function Footer({ currentIdx, setCurrentIdx, length }: FooterProps) {
    return (
        <div>
            <footer className="px-6 py-4 border-t border-border bg-card flex items-center justify-between">
                <Button
                    variant="outline"
                    onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                    disabled={currentIdx === 0}
                    className="gap-2"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                </Button>

                <div className="flex items-center gap-3">
                    {currentIdx < length - 1 ? (
                        <Button
                            onClick={() => setCurrentIdx((prev) => Math.min(length - 1, prev + 1))}
                            className="gap-2 px-6"
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    ) : (
                        <Button variant="default" className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                            Submit Test
                            <Send className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </footer>
        </div>
    )
}

export default Footer