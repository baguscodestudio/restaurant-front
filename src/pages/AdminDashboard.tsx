import { useEffect, useState } from "react";
import GetCurrentUser from "../functions/GetCurrentUser";
import User from "../typings/User";

const AdminDashboard = () => {
  const [user, setUser] = useState<User>({
    userid: 0,
    username: "",
  });
  useEffect(() => {
    setUser(GetCurrentUser());
  }, [localStorage.getItem("userData")]);

  if (user.role == "admin") {
  } else {
    return null;
  }
};

export default AdminDashboard;
