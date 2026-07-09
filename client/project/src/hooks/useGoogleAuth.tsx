import { useGoogleOneTapLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google'
import { useState } from 'react';
import type { GoogleUserProfile } from '@/types/auth'
import { authenticateUser } from '@/services/auth'

export const useGoogleAuth = () => {
    const [user, setUser] = useState<GoogleUserProfile | null>(null)
    const [error, setError] = useState<string | null>(null)
    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            try {
                const res = await authenticateUser(credentialResponse.credential)
                const json = await res?.data
                console.log(json)
                setUser(json.user)
            } catch (error) {
                setError("Failed to decode user!!!")
            }

        } else {
            setError("No credential returned from google!!!")
        }
    }

    const handleError = () => {
        setError("Authentication failed!!!")
    }

    useGoogleOneTapLogin({
        onSuccess: handleSuccess,
        onError: handleError
    })

    return { user, error, handleSuccess, handleError }
}



