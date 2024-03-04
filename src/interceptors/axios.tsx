import { AuthContext } from "@/contexts/AuthContext"
import { AuthContextType } from "@/models/context"
import axios, { Axios, AxiosRequestConfig, AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios"
import { useContext, useEffect } from "react"

export const AxiosInterceptor = () => {

    let { logoutUser, authTokens } = useContext(AuthContext) as AuthContextType

    useEffect(() => {


        axios.interceptors.request.use((request) => {
            const token = authTokens?.access
            request.headers["Content-Type"] = "application/json"
            request.headers["Authorization"] = 'Bearer ' + token
            return request
        })


        axios.interceptors.response.use(
            (response) => {
                console.log(response)
                return response

            }, (error) => {
                if (error.request.status) {
                    logoutUser()
                    console.log("desl")
                }
                return Promise.reject(error)
            })
    }, [])

    return null
}

