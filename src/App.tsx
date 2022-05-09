import { useEffect, useState, createContext } from "react";
import "./App.css";
import axios from "axios";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import User from "./typings/User";

import ProtectedRoutes from "./ProtectedRoutes";
import Navbar from "./components/Navbar";

import AdminDashboard from "./pages/AdminDashboard";
import ManageProfile from "./pages/ManageProfile";
import ManageUser from "./pages/ManageUser";
import ManageMenu from "./pages/ManageMenu";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

export const UserContext = createContext<User>({
  userid: 0,
  username: "",
});

function App() {
  const [loading, setLoading] = useState(true);
  const [access, setAccess] = useState(false);
  const [user, setUser] = useState<User>({
    userid: 0,
    username: "",
  });

  const useAuth = async () => {
    await axios
      .post(
        "http://localhost:1337/token",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        if (data.tokenVerificationData.access) {
          setUser(JSON.parse(localStorage.getItem("userData")!));
        } else {
        }

        setAccess(data.tokenVerificationData.access);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetSession = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    setUser({
      userid: 0,
      username: "",
    });
    setAccess(false);
    toast("Successfully logged out");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData")!);
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <Router>
      <div className="h-screen w-screen flex flex-col">
        <UserContext.Provider value={user}>
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
          <Navbar resetSession={resetSession} />
          <Routes>
            <Route path="/" element={<Home />} />
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
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/manageprofile" element={<ManageProfile />} />
              <Route path="/manageuser" element={<ManageUser />} />
              <Route path="/managemenu" element={<ManageMenu />} />
            </Route>
          </Routes>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
