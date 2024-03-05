import { AuthContext } from "@/contexts/AuthContext"
import { AuthContextType } from "@/models/context"
import axios from "axios"
import { useContext, useEffect } from "react"

export const AxiosInterceptor = () => {

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
                    console.error("Error de autenticación. Por favor, vuelve a iniciar sesión.");
                    logoutUser();
                } else {
                    console.error("Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.");
                }
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