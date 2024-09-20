import "./App.css";
// import { Route, Routes, useNavigate } from "react-router-dom";
// import { MainPage } from "./pages/main/main/MainPage";
// import { UsersPage } from "./pages/users/main/UsersPage";
// import { LoginPage } from "./pages/login/main/LoginPage";
// import { useEffect, useState } from "react";
// import { loginToken } from "./pages/login/logic/login";
// import { auth } from "./config/redux/slices/workerSlice";
// import { useDispatch } from "react-redux";
import { DatabaseManagment } from "./pages/databaseManagment/main/DatabaseManagment";

function App() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const [token] = useState<string | null>(
  //   localStorage.getItem("ABS_access_token")
  // );

  // useEffect(() => {
  //   const login = async () => {
  //     if (token && token != "undefined") {
  //       try {
  //         const userData = await loginToken(token);
  //         if (userData) {
  //           console.log('userData', userData)
  //           dispatch(auth(userData.worker));
  //           localStorage.setItem("ABS_access_token", userData.access_token);
  //           navigate("/main");
  //         } else {
  //           navigate("/");
  //         }
  //       } catch (error) {
  //         console.error("Error during token login:", error);
  //         navigate("/");
  //       }
  //     }
  //   };
  //   login();
  // }, [token]);

  // useEffect(() => {
  //   localStorage.setItem("ABS_access_token", "");
  // }, []);

  return (
    <DatabaseManagment />
    // <Routes>
    //   <Route path="/main" element={<DatabaseManagment />} />
    //   {/* <Route path="/users" element={<UsersPage />} />
    //   <Route path="*" element={<LoginPage />} /> */}
    // </Routes>
  );
}

export default App;
