import React, { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Navigation.module.css";


export const Navigation = () => {
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    const onLoginClick = useCallback(() => {
        navigate('../login');
    },[navigate]);

    return (
        <div className={styles.container}>
            <div>Defence practise</div>
            {!isAuthenticated && <div className={styles.button} onClick={onLoginClick}>Login or Registration</div>}
            {isAuthenticated && <><div className={styles.button}>Tasks</div><div className={styles.button}>Profile</div></>}
        </div>
    )
}