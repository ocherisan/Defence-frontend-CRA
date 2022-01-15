import { createContext } from "react";

interface AuthorizationContextData {
    token: string | null, 
    userId: string | null, 
    login: (jwtToken?: string, userId?: string) => void, 
    logout: () => void,
    isAuthenticated: boolean
}

//TODO: перенсти в хуки не отделяя контекст

export const AuthContext = createContext<AuthorizationContextData>({
    token: null, userId: null, login: () => null, logout: () => null, isAuthenticated: false
})