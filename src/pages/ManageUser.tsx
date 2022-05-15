import { useContext, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import GetUsersController from "../controller/GetUsersController";
import DeleteUserController from "../controller/DeleteUserController";

import { UserContext } from "../App";
import User from "../typings/User";
import UpdateUser from "./UpdateUser";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import CreateUser from "./CreateUser";

// Title of boundary
const ManageUser = () => {
  // These are the variables of the boundary
  // First index is the variable, second is the function
  // example:
  // Title ManageUser
  // username: String
  // setSearch(String search)
  const user = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [select, setSelect] = useState(-1);
  const [action, setAction] = useState("");

  // These are the functions of the boundary
  const getUsers = async () => {
    let GetUsers = new GetUsersController();
    let response = await GetUsers.getUsers();
    setUsers(response?.data);
  };

  const changePage = (page: string) => {
    if (select !== -1) {
      setAction(page);
    } else {
      toast.error("Select an order first!");
    }
  };

  const handleDelete = async () => {
    if (select !== -1) {
      let DeleteUser = new DeleteUserController();
      let response = await DeleteUser.deleteUser(users[select].userid);
      if (response?.status == 200) {
        toast("Successfully deleted User");
        getUsers();
      } else {
        toast("Failed to update user");
      }
    } else {
      toast.error("Select an order first!");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (user.role == "admin" && action === "") {
    return (
      <>
        <div className="w-11/12 my-2 mx-auto">
          <SearchBar setSearch={setSearch} />
        </div>
        <div className="inline-flex my-4 mx-auto text-white">
          <button
            className="mx-2 px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
            onClick={() => changePage("add")}
          >
            Add
          </button>
          <button
            className="mx-2 px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
            onClick={() => changePage("update")}
          >
            Update
          </button>
          <button
            className="mx-2 px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
        <div className="w-11/12 h-3/5 bg-neutral-300 mx-auto mt-2 mb-auto px-10 py-4 text-lg flex flex-col">
          <table className="w-1/3">
            <thead className="text-left">
              <tr className="h-4">
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) =>
                  user.username.toLowerCase().includes(search.toLowerCase())
                )
                .map((user, index) => (
                  <>
                    {index == select ? (
                      <tr
                        key={index}
                        className="text-white h-4 bg-[#27635e] hover:bg-[#134E4A] hover:cursor-pointer"
                        onClick={() => setSelect(index)}
                      >
                        <td>{user.username}</td>
                      </tr>
                    ) : (
                      <tr
                        key={index}
                        className="h-4 hover:bg-[#134E4A] hover:text-white hover:cursor-pointer"
                        onClick={() => setSelect(index)}
                      >
                        <td>{user.username}</td>
                      </tr>
                    )}
                  </>
                ))}
            </tbody>
          </table>
        </div>
      </>
    );
  } else if (user.role === "admin" && action === "update") {
    return (
      <>
        <button
          className="absolute bottom-10 left-10 bg-neutral-300 px-4 rounded-lg text-lg hover:bg-neutral-600 hover:scale-105 hover:text-white"
          onClick={() => setAction("")}
        >
          Back
        </button>
        <UpdateUser
          user={users[select]}
          setAction={setAction}
          getUsers={getUsers}
        />
      </>
    );
  } else if (user.role === "admin" && action === "add") {
    return (
      <>
        <button
          className="absolute bottom-10 left-10 bg-neutral-300 px-4 rounded-lg text-lg hover:bg-neutral-600 hover:scale-105 hover:text-white"
          onClick={() => setAction("")}
        >
          Back
        </button>
        <CreateUser setAction={setAction} getUsers={getUsers} />
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default ManageUser;
