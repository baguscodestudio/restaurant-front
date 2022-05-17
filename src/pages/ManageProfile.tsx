import { Dialog } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import SearchBar from "../components/SearchBar";
import GetRolesController from "../controller/GetRolesController";
import RemoveProfileController from "../controller/RemoveProfileController";
import SearchUserProfileController from "../controller/SearchUserProfileController";
import User from "../typings/User";
import UpdateProfile from "./UpdateProfile";

const ManageProfile = () => {
  const user = useContext(UserContext);

  const [users, setUsers] = useState<User[]>([]);
  const [select, setSelect] = useState(-1);
  const [action, setAction] = useState("");
  const [open, setOpen] = useState(false);

  const getRoles = async () => {
    let GetRoles = new GetRolesController();
    let response = await GetRoles.getRoles();
    setUsers(response?.data);
  };

  const handleSearch = async (search: string) => {
    if (search) {
      let SearchProfile = new SearchUserProfileController();
      let response = await SearchProfile.searchProfile(search);
      setUsers(response?.data);
    } else {
      getRoles();
    }
  };

  const changePage = (page: string) => {
    if (select !== -1) {
      setAction(page);
    } else {
      toast.error("Select an order first!");
    }
  };

  const handleRemove = async () => {
    if (select !== -1) {
      let RemoveProfile = new RemoveProfileController();
      let response = await RemoveProfile.removeProfile(users[select].userid);
      if (response?.status == 200) {
        setOpen(false);
        getRoles();
        toast("Successfully removed user role");
      } else {
        toast("Failed to remove user role");
      }
    } else {
      toast.error("Select an order first!");
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  if (user.role === "admin" && action === "") {
    return (
      <>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          as="div"
          className="relative z-10"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Are you sure you want to delete this user profile?
                </Dialog.Title>

                <div className="w-full inline-flex text-white mt-4">
                  <button
                    className="mx-2 px-2 py-1 rounded-md bg-neutral-700 hover:bg-neutral-500 transition-colors duration-150"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRemove}
                    className="mx-2 px-2 py-1 rounded-md bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
                  >
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
        <div className="w-11/12 my-2 mx-auto">
          <SearchBar setSearch={handleSearch} />
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
              onClick={() => changePage("update")}
            >
              Update
            </button>
            <button
              className="mx-2 px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
              onClick={() => setOpen(true)}
            >
              Remove
            </button>
          </div>
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
        <UpdateProfile user={users[select]} setAction={setAction} />
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default ManageProfile;
