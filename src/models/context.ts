
export type userJWT = {
    email: string
    exp: number
    iat: number
    jti: string
    token_type: "access" | "refresh"
    user_id: number
    verified: number
}

export type authTokens = {
    access: string
    refresh: string
}

export interface AuthContextType {
    user: userJWT | null
    authTokens: authTokens | null
    loginUser: Function
    logoutUser: Function
    logInWithTokens: Function
}

