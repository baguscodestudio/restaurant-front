import React, { useState } from "react";
import { toast } from "react-toastify";
import UpdateUserController from "../controller/UpdateUserController";
import User from "../typings/User";

const UpdateUser: React.FC<{
  user: User;
  setAction: React.Dispatch<React.SetStateAction<string>>;
}> = ({ user, setAction }) => {
  const [newUsername, setUsername] = useState(user.username);
  const [newPassword, setPassword] = useState("");

  const handleUpdate = async () => {
    let UpdateUser = new UpdateUserController();
    let response = await UpdateUser.updateUser(
      newUsername,
      newPassword,
      user.userid
    );
    if (response?.status == 200) {
      toast("Successfully updated user");
      setAction("");
    } else {
      toast("Failed to update user");
    }
  };

  return (
    <div className="bg-neutral-300 w-10/12 h-4/5 flex p-10 mx-auto my-auto">
      <div className="text-lg mr-4">Username: {user.username}</div>
      <div className="flex flex-col mx-4 items-center">
        <input
          className="mb-2 px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
          placeholder="New Username"
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
        <input
          className="my-2 px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
          type="password"
          placeholder="New Password"
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <button
          className="text-white my-2 mx-2 px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateUser;
