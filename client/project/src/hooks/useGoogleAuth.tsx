import { useGoogleOneTapLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google'
import { useState } from 'react';
import { authenticateUser } from '@/services/auth'
import { displayNotification } from '@/utils/displayNotification';
import { useNavigate } from 'react-router-dom';
import { useProvider } from '@/provider/userProvider';

export const useGoogleAuth = () => {
    const { setUser }: any = useProvider()
    const navigate = useNavigate()

    const [error, setError] = useState<string | null>(null)
    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            try {
                const res = await displayNotification(authenticateUser(credentialResponse.credential))
                const json = res?.data
                console.log(json)
                setUser(json.user)
                sessionStorage.setItem('user', JSON.stringify(json.user))
                navigate(`/main-app/${json.user._id}`)
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

    return { error, handleSuccess, handleError }
}



