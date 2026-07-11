import { createContext } from 'react'
// import { GoogleUserProfile } from '@/types/auth'
import type { UserContextType } from '@/types/auth'

const UserContext = createContext<UserContextType | null>(null)

export default UserContext