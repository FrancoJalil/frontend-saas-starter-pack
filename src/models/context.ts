
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
    user: userJWT
    authTokens: authTokens
    loginUser: Function
    logoutUser: Function
}

