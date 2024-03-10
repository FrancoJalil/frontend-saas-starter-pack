import { useToast } from "@/components/ui/use-toast"
import { AuthContext } from "@/contexts/AuthContext"
import { AuthContextType } from "@/models/context"
import axios from "axios"
import { useContext, useEffect } from "react"

export const AxiosInterceptor = () => {

    const { toast } = useToast()


    const { logoutUser, authTokens } = useContext(AuthContext) as AuthContextType
    
    useEffect(() => {
        if (!authTokens) {
            return () => {}; // Devuelve una función vacía si authTokens no está definido
        }
    
        const requestInterceptor = axios.interceptors.request.use((request) => {
            const token = String(authTokens.access);
            request.headers["Content-Type"] = "application/json";
            request.headers["Authorization"] = 'Bearer ' + token;
            return request;
        });
    
        const responseInterceptor = axios.interceptors.response.use(
            (response) => {

                return response;
            },
            (error) => {
                if (error.request.status === 401) {
                    logoutUser();
                } else if (error.request.status === 429) {
                    toast({ title: "Error", description: "Too many requests. Wait " + error.response.data.availableIn , duration: 3000 })
                } else {
                    toast({ title: "Error", description: error.response.data.msg, duration: 3000 })
                }
                console.log(error)
                return Promise.reject(error);
            }
        );
    
        return () => {
            // Limpiar los interceptores cuando el componente se desmonte
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [authTokens]); // Ejecutar el efecto solo cuando authTokens cambie
    

    return null
}