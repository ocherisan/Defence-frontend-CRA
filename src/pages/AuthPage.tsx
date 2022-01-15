import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

//TODO: редирект куда-то после логина
export const AuthPage = () => {
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email:"",
        password:""
    });
    const navigate = useNavigate();

    const auth = useContext(AuthContext);

    useEffect(()=>{
        //TODO: вот тут добавить нотификацию
        clearError();
    },[error, clearError])

    const changeHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const registerHandler = async() => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log(data.data);
            //TODO: оповестить, что пользователь успешно создан
        } catch (error) {
            
        }
    }

    const loginHandler = async() => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            console.log(data.data);
            //TODO: оповестить, что пользователь успешно создан

            auth.login(data.token, data.userId);
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        if (auth.isAuthenticated) {
            navigate("../");
        }
    },[navigate, auth])

  return (
    <div>
      <h1>сократи ссылку</h1>
      <span>Авторизация</span>
      <div>
        <div>
            <input placeholder="Введие email"  id="email" type="test" name="email" onChange={changeHandler}/>
            <label htmlFor="email">Email</label>
        </div>
        <div>
            <input placeholder="Введие пароль"  id="password" type="password" name="password" onChange={changeHandler}/>
            <label htmlFor="password">Пароль</label>
        </div>
      </div>
      <div>
        <button onClick={loginHandler} disabled={loading}>Войти</button>
        <button onClick={registerHandler} disabled={loading}>Регистрация</button>
      </div>
    </div>
  );
};
