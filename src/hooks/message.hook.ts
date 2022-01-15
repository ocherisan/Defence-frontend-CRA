import {createContext, useCallback, useContext, useMemo, useState} from 'react'

interface MessageData {
    text: string;
}

interface MessageContextData {
    show: boolean;
    text: string;
    setMessage: (message:MessageData) => void;
    closeMessage: () => void;
}


const MessageContextDefaultData = {
    show: false,
    text: "",
    setMessage: () => null,
    closeMessage: () => null
}

export const MessageContext = createContext<MessageContextData>(MessageContextDefaultData);

export function useMessageContext():MessageContextData {
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");

    const setMessage = useCallback(({text: messageText}:MessageData)=>{
        setShow(true);
        setText(`${messageText}`);
    },[]);

    const closeMessage = useCallback(()=>{
        setShow(false);
        setText("");
    },[])

    return useMemo(()=>({
        show, text,setMessage, closeMessage
    }),[show, text, setMessage, closeMessage]);
}

export function useMessage() {
    const {show, text, setMessage, closeMessage} = useContext(MessageContext);
    return useMemo(()=>({show, text, setMessage, closeMessage}),[show, text, setMessage, closeMessage])
}