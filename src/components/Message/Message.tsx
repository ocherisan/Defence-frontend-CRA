import React, { useEffect } from "react";
import { useMessage } from "../../hooks/message.hook";
import styles from "./Message.module.css";

//TODO: добавить провайдер на использование сообщений
export const Message = () => {
    const {show, text, closeMessage} = useMessage();

    useEffect(()=>{
        if (show) {
            setTimeout(()=>{
                closeMessage();
            },10*1000)
        }
    },[show, closeMessage])

    if (!show) {
        return null;
    }

    return (<div className={styles.container}>
        {text}
    </div>)
}