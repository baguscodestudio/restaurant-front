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
import Order from "./pages/CreateOrder";
import ManageOrder from "./pages/ManageOrder";
import ViewOrder from "./pages/ViewOrder";
import Statistics from "./pages/Statistics";
import Payment from "./pages/Payment";
import ManageCoupon from "./pages/ManageCoupon";

export const UserContext = createContext<User>({
  userid: 0,
  username: "",
});

export const TableContext = createContext({
  tablenum: 0,
  setTablenum: (num: number) => {},
});

function App() {
  const [loading, setLoading] = useState(true);
  const [access, setAccess] = useState(false);
  const [tablenum, setTablenum] = useState(0);
  const [user, setUser] = useState<User>({
    userid: 0,
    username: "",
  });

  const useAuth = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_REST_URL}/token`,
        {
          withCredentials: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => response.data)
      .then((data) => {
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
      <div className="h-screen w-screen flex flex-col text-xs sm:text-base">
        <UserContext.Provider value={user}>
          <TableContext.Provider value={{ tablenum, setTablenum }}>
            <ToastContainer
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover
              theme="dark"
            />
            <Navbar resetSession={resetSession} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/order" element={<Order />} />
              <Route path="/vieworder" element={<ViewOrder />} />
              <Route path="/payment/:tablenum" element={<Payment />} />
              <Route
                element={
                  <ProtectedRoutes
                    useAuth={useAuth}
                    loading={loading}
                    access={access}
                  />
                }
              >
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/manageprofile" element={<ManageProfile />} />
                <Route path="/manageuser" element={<ManageUser />} />
                <Route path="/manageorder" element={<ManageOrder />} />
                <Route path="/managecoupon" element={<ManageCoupon />} />
                <Route path="/managemenu" element={<ManageMenu />} />
              </Route>
            </Routes>
          </TableContext.Provider>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
