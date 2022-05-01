import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import {
  useNavigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("accessToken")}`;
  const [userData, setUserData] = useState({
    username: null,
    password: null,
  });
  const [loading, setLoading] = useState(true);
  const [access, setAccess] = useState(false);

  const useAuth = async () => {
    console.log('access before verification" ' + access);
    console.log(axios.defaults.headers.common["Authorization"]);
    await axios
      .post("http://localhost:1337/token")
      .then((response) => response.data.data)
      .then((data) => {
        console.log(data);
        if (data.tokenVerificationData.access) {
          setUserData(data.tokenVerificationData.user);
        } else {
          window.location.href = "/";
        }
        console.log(
          "access from verification: " + data.tokenVerificationData.access
        );
        setAccess(data.tokenVerificationData.access);
        console.log("access after verification: " + access);
        setLoading(false);
      });
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAccess(false);
  };
  return (
    <Router>
      <div className="h-screen w-screen flex flex-col bg-orange-200">
        <Routes>
          <Route path="/" element={<Home handleLogout={handleLogout} />} />
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <ProtectedRoutes
                useAuth={useAuth}
                loading={loading}
                access={access}
              />
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
