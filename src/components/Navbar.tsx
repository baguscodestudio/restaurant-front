import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetCurrentUser from "../functions/GetCurrentUser";
import User from "../typings/User";

const Navbar: React.FC<{ resetSession: () => void }> = ({ resetSession }) => {
  const [user, setUser] = useState<User>({
    userid: 0,
    username: "",
  });
  useEffect(() => {
    console.log("updating navbar");
    setUser(GetCurrentUser());
  }, [localStorage.getItem("userData")]);

  return (
    <div className="w-full bg-neutral-300 h-12 shadow-lg inline-flex justify-end pr-4">
      <Link
        to="/"
        className="h-full px-4 hover:text-white hover:bg-[#134E4A] flex items-center"
      >
        Home
      </Link>
      {user.username.length > 0 ? (
        <>
          <button
            onClick={resetSession}
            className="h-full px-4 hover:text-white hover:bg-[#134E4A] flex items-center"
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className="h-full px-4 hover:text-white hover:bg-[#0B3835] flex items-center"
        >
          Login
        </Link>
      )}
      {user.role === "admin" && (
        <Link
          to="/admin"
          className="h-full px-4 hover:text-white hover:bg-[#0B3835] flex items-center"
        >
          Administration
        </Link>
      )}
    </div>
  );
};

export default Navbar;