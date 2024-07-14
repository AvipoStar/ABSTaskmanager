import React, { useState } from "react";
import "../styles/LoginPage.css";
import { login } from "../logic/login";

export const LoginPage = () => {
  const [loginData, setLoginData] = useState<{
    login: string;
    password: string;
  }>({ login: "", password: "" });

  const handleLogin = async () => {
    console.log("loginData", loginData);
    const result = await login(loginData.login, loginData.password);
    if (result) console.log("result", result);
  };

  return (
    <div className="LoginPage">
      <div className="LoginModal">
        <div>Логин</div>
        <input
          value={loginData.login}
          onChange={(e) =>
            setLoginData({ ...loginData, login: e.target.value })
          }
        />
        <div>Пароль</div>
        <input
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <button onClick={handleLogin}>Войти</button>
      </div>
    </div>
  );
};
