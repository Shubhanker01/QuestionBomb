
import type { GoogleUserProfile } from '@/types/auth'
import { useContext, useState } from 'react'
import UserContext from '@/context/userContext'
function UserProvider({ children }: any) {
    const [user, setUser] = useState<GoogleUserProfile | null>(() => {
        const stored = sessionStorage.getItem('user')
        return stored ? JSON.parse(stored) : null
    })

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export function useProvider() {
    return useContext(UserContext)
}

export default UserProvider