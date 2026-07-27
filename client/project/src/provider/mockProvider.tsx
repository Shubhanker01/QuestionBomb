import MockContext from "@/context/mockContext";
import { useContext, useState } from "react";
import type { MockType } from "@/types/mock";


export default function MockProvider({ children }: any) {
    const [mockInfo, setmockInfo] = useState<MockType | null>(() => {
        const storedMockInfo = sessionStorage.getItem('mock')
        return storedMockInfo ? JSON.parse(storedMockInfo) : null
    })
    return (
        <MockContext.Provider value={{ mockInfo, setmockInfo }}>
            {children}
        </MockContext.Provider>
    )


}

export function useMockContext() {
    return useContext(MockContext)
}