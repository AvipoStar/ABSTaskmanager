import { useState } from "react";
import "../styles/LoginPage.css";
import { loginPassword } from "../logic/login";
import { useDispatch } from "react-redux";
import { auth } from "../../../config/redux/slices/workerSlice";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<{
    login: string;
    password: string;
  }>({ login: "", password: "" });

  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null); // Очистить предыдущие ошибки перед новой попыткой входа

    try {
      let userData: any = {};
      userData = await loginPassword(loginData.login, loginData.password);
      if (userData) {
        dispatch(auth(userData.worker));
        localStorage.setItem("ABS_access_token", userData.access_token);
        navigate("/main");
      } else {
        setError("Неверный логин или пароль");
      }
    } catch (err) {
      setError("Произошла ошибка при попытке входа");
      console.error("Login error:", err);
    }
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
          type="password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        {error && <div className="error">{error}</div>}
        <button onClick={handleLogin}>Войти</button>
      </div>
    </div>
  );
};
