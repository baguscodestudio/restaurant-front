import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SearchBar from "../components/SearchBar";
import GetRolesController from "../controller/GetRolesController";
import RemoveProfileController from "../controller/RemoveProfileController";
import GetCurrentUser from "../functions/GetCurrentUser";
import User from "../typings/User";
import UpdateProfile from "./UpdateProfile";

const ManageProfile = () => {
  const [user, setUser] = useState<User>({
    userid: 0,
    username: "",
  });
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [select, setSelect] = useState(-1);
  const [action, setAction] = useState("");

  const getRoles = async () => {
    let GetRoles = new GetRolesController();
    let response = await GetRoles.getRoles();
    setUsers(response?.data);
  };

  const handleRemove = async () => {
    let RemoveProfile = new RemoveProfileController();
    let response = await RemoveProfile.removeProfile(users[select].userid);
    if (response?.status == 200) {
      getRoles();
      toast("Successfully removed user role");
    } else {
      toast("Failed to remove user role");
    }
  };

  useEffect(() => {
    setUser(GetCurrentUser());
    getRoles();
  }, [localStorage.getItem("userData")]);
  if (user.role === "admin" && action === "") {
    return (
      <>
        <div className="w-11/12 my-2 mx-auto">
          <SearchBar setSearch={setSearch} />
        </div>
        <div className="w-11/12 h-4/5 bg-neutral-300 mx-auto mt-2 mb-auto px-10 py-4 text-lg flex flex-col">
          <table className="w-1/3">
            <thead className="text-left">
              <tr className="h-4">
                <th>Username</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <>
                  {index == select ? (
                    <tr
                      key={index}
                      className="text-white h-4 bg-[#27635e] hover:bg-[#134E4A] hover:cursor-pointer"
                      onClick={() => setSelect(index)}
                    >
                      <td>{user.username}</td>
                      <td>{user.role}</td>
                    </tr>
                  ) : (
                    <tr
                      key={index}
                      className="h-4 hover:bg-[#134E4A] hover:text-white hover:cursor-pointer"
                      onClick={() => setSelect(index)}
                    >
                      <td>{user.username}</td>
                      <td>{user.role}</td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
          <div className="inline-flex w-full mt-auto text-white">
            <button
              className="mx-2 px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
              onClick={() => setAction("update")}
            >
              Update
            </button>
            <button
              className="mx-2 px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>
        </div>
      </>
    );
  } else if (user.role === "admin" && action === "update") {
    return <UpdateProfile user={users[select]} setAction={setAction} />;
  } else {
    return null;
  }
};

export default ManageProfile;
