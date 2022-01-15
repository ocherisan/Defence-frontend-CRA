import {useState, useCallback} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const request = useCallback(async (url, method = 'GET', body=null, headers={}) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url,{method, body, headers});
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message, 'Что-то не так на сервере')
            }
            return data;
        } catch (e) {
            setError(e.message);
            throw e;
        }
        finally{
            setLoading(false)
        }
    },[setError, setLoading]);

    const clearError = useCallback(() => setError(null),[setError]);

    return {loading, request, error, clearError}
}