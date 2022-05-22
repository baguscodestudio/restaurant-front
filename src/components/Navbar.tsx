import { useContext } from "react";
import { Link } from "react-router-dom";
import { TableContext, UserContext } from "../App";

const Navbar: React.FC<{ resetSession: () => void }> = ({ resetSession }) => {
  const user = useContext(UserContext);
  const { tablenum } = useContext(TableContext);

  return (
    <div className="w-full bg-neutral-300 h-12 shadow-lg inline-flex justify-end pr-4">
      <div className="h-full inline-flex mr-auto ml-4">
        <Link
          to="/"
          className="h-full px-4 hover:text-white hover:bg-[#134E4A] flex items-center"
        >
          Home
        </Link>
        {!user.role && (
          <Link
            to="/order"
            className="h-full px-4 hover:text-white hover:bg-[#134E4A] flex items-center"
          >
            Order{" "}
            {tablenum > 0 && tablenum && `Current table number: ${tablenum}`}
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
        {user.role === "staff" && (
          <Link
            to="/manageorder"
            className="h-full px-4 hover:text-white hover:bg-[#0B3835] flex items-center"
          >
            Manage Orders
          </Link>
        )}
        {user.role === "manager" && (
          <Link
            to="/managemenu"
            className="h-full px-4 hover:text-white hover:bg-[#0B3835] flex items-center"
          >
            Manage Menu
          </Link>
        )}
        {user.role === "owner" && (
          <Link
            to="/statistics"
            className="h-full px-4 hover:text-white hover:bg-[#0B3835] flex items-center"
          >
            Statistics
          </Link>
        )}
      </div>
      {user.username.length > 0 ? (
        <>
          <div className="h-full px-4 flex items-center">
            Logged in as {`${user.username} (${user.role})`}
          </div>
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
    </div>
  );
};

export default Navbar;
