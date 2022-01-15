import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import styles from './AuthPage.module.css';

export const AuthPage = () => {
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email:"",
        password:""
    });
    const navigate = useNavigate();
    const {setMessage} = useMessage();

    const auth = useContext(AuthContext);

    useEffect(()=>{
        setMessage({text: error || "Something went wrong"})
        clearError();
    },[error, clearError, setMessage])

    const changeHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const registerHandler = async() => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log(data.data);
        } catch (error) {
            
        }
    }

    const loginHandler = async() => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            console.log(data.data);

            auth.login(data.token, data.userId);
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        if (auth.isAuthenticated) {
            navigate("../");
        }
    },[navigate, auth])

    useEffect(()=>{
        console.log(loading)
    },[loading])

  return (
      <div className={styles.container}>
    <div className={styles.form}>
      <div className={styles.header}>Вход в личный кабинет</div>
      <div>
        <div className={styles.inputContainer}>
            <label htmlFor="email">Email</label>
            <input placeholder="Введите email"  id="email" type="test" name="email" onChange={changeHandler}/>  
        </div>
        <div className={styles.inputContainer}>
            <label htmlFor="password">Пароль</label>
            <input placeholder="Введите пароль"  id="password" type="password" name="password" onChange={changeHandler}/>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <button onClick={loginHandler} disabled={loading}>Войти</button>
        <button onClick={registerHandler} disabled={loading}>Регистрация</button>
      </div>
    </div>
    </div>
  );
};
