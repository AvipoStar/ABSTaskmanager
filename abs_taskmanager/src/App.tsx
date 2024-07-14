import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/main/main/MainPage";
import { UsersPage } from "./pages/users/main/UsersPage";
import { LoginPage } from "./pages/login/main/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
