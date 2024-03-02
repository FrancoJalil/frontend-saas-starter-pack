import { useEffect, useState, useContext } from "react"
import { AuthContext } from '../contexts/AuthContext'

type responseFetch = {
    data: any
    isLoading: any
    errors: any
}

export const useFetch = (url: string, method: string, tokenRequired: boolean) => {

    let { authTokens, logoutUser } = useContext(AuthContext)

    const [state, setState] = useState<responseFetch>({
        data: null,
        isLoading: true,
        errors: null
    })

    const { data, isLoading, errors } = state

    const getFetch = async () => {
        try {
            const headers: { [key: string]: string } = {
                'Content-Type': 'application/json'
            };

            if (tokenRequired) {
                headers['Authorization'] = 'Bearer ' + String(authTokens?.access);
            }

            const response = await fetch(url, {
                method,
                headers
            })

            if (response.status === 401) {
                logoutUser()
            }

            const data = await response.json()
            setState({
                data,
                isLoading: false,
                errors: null
            })
        } catch (err) {
            console.error(err)
            setState({
                data,
                isLoading: false,
                errors: err
            })
        }


    }

    useEffect(() => {
        if (!url) return
        getFetch()
    }, [url])

    return {
        data,
        isLoading,
        errors
    }
}
