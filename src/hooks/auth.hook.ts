import {useState, useCallback, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const STORAGE_NAME = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [ready, setReady] = useState(false);

    const login = useCallback((jwtToken, id)=>{
        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem(STORAGE_NAME, JSON.stringify({
            userId: id, token: jwtToken
        }))
    },[]);

    const logout = useCallback(()=>{
        setToken(null);
        setUserId(null);
        localStorage.removeItem(STORAGE_NAME);
    },[]);

    useEffect(()=>{
        const userData = localStorage.getItem(STORAGE_NAME);
        if (userData) {
            const data = JSON.parse(userData);
            if (data && data.token) {
                login(data.token, data.userId);
            }
        }
        setReady(true)
    },[login])

    return {login, logout, token, userId, ready}
}

export const useRedirectToLogin = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if (!isAuthenticated){
            navigate('../login')
        }
    },[isAuthenticated, navigate])
}