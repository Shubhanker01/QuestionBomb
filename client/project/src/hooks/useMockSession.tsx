import { useEffect, useState } from "react";
import { getOrStartMockSession } from "@/services/mocks";
import type { MockSessionStatus } from '@/types/mock'

export function useMockSession(mockId: string) {
    const [mockSession, setMockSession] = useState<MockSessionStatus | null>(null)
    useEffect(() => {
        async function getMockSession() {
            try {
                const res = await getOrStartMockSession(mockId)
                const json = await res?.data
                console.log(json)
                if (json?.success === true) {
                    setMockSession({
                        mockId: json?.mockId,
                        status: json?.status,
                        startedAt: json?.startedAt,
                        timeRemainingInSeconds: json?.timeRemainingInSeconds,
                        userAnswers: json?.userAnswers || {}
                    })
                }
            }
            catch (error) {
                console.error("Error fetching mock session")
            }
        }
        getMockSession()
    }, [])

    return mockSession
}