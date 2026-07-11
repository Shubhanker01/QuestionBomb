import type React from "react"

export interface GoogleUserProfile {
    _id: string,
    name: string,
    avatar: string,
    email: string
}

export interface UserContextType {
    user: GoogleUserProfile | null,
    setUser: React.Dispatch<React.SetStateAction<GoogleUserProfile | null>>
}