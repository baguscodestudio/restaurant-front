import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Logout from "./pages/Logout";
import { toast, ToastContainer } from "react-toastify";

function App() {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("accessToken")}`;
  const [loading, setLoading] = useState(true);
  const [access, setAccess] = useState(false);

  const useAuth = async () => {
    await axios
      .post("http://localhost:1337/token")
      .then((response) => response.data.data)
      .then((data) => {
        if (data.tokenVerificationData.access) {
          localStorage.setItem(
            "userData",
            JSON.stringify(data.tokenVerificationData.user)
          );
        } else {
        }

        setAccess(data.tokenVerificationData.access);
        setLoading(false);
      });
  };
  const resetSession = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    setAccess(false);
    toast("Successfully logged out");
  };
  return (
    <Router>
      <div className="h-screen w-screen flex flex-col">
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home handleLogout={resetSession} />} />
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
            <Route
              path="/logout"
              element={<Logout resetSession={resetSession} />}
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
