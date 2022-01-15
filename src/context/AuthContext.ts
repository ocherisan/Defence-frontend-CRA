import { createContext } from "react";

function noop(){}

interface AuthorizationContextData {
    token: string | null, 
    userId: string | null, 
    login: (jwtToken?: string, userId?: string) => void, 
    logout: () => void,
    isAuthenticated: boolean
}

export const AuthContext = createContext<AuthorizationContextData>({
    token: null, userId: null, login: noop, logout: noop, isAuthenticated: false
})