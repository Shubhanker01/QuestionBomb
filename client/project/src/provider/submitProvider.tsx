import { useContext, useState } from "react";

import SubmitContext from "@/context/submitContext";

function SubmitProvider({ children }: any) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    return (
        <SubmitContext.Provider value={{ isSubmitting, setIsSubmitting }}>
            {children}
        </SubmitContext.Provider>
    )
}

export function useSubmitProvider() {
    return useContext(SubmitContext)
}

export default SubmitProvider