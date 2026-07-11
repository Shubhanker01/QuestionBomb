import type { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

export const displayNotification = async (promise: Promise<AxiosResponse<any>>) => {
    const id = toast.loading('Loading...')
    try {
        const response = await promise
        toast.update(id, {
            render: response.data.message,
            type: "success",
            autoClose: 3000,
            isLoading: false
        })
        return response
    }
    catch (error: any) {
        toast.update(id, {
            render: "Some error occured!!!",
            type: "error",
            autoClose: 3000,
            isLoading: false
        })
        throw error
    }
}