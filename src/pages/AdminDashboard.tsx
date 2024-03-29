import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const AdminDashboard = () => {
  const user = useContext(UserContext);

  if (user.role == "admin") {
    return (
      <>
        <div className="ml-40 mr-auto inline-flex my-2 items-center justify-center font-bold text-4xl bg-neutral-300 w-1/4 h-40 ">
          Admin Dashboard
        </div>
        <div className="ml-40 mr-auto inline-flex my-4 text-white w-1/4 justify-between">
          <Link
            to="/manageprofile"
            className="px-4 py-2 text-lg text-center w-52 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
          >
            Manage profiles
          </Link>
          <Link
            to="/manageuser"
            className="px-4 py-2 text-lg text-center w-52 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
          >
            Manage accounts
          </Link>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default AdminDashboard;
