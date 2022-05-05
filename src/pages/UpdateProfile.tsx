import React, { useState } from "react";
import { toast } from "react-toastify";
import UpdateProfileController from "../controller/UpdateProfileController";
import User from "../typings/User";

const UpdateProfile: React.FC<{
  user: User;
  setAction: React.Dispatch<React.SetStateAction<string>>;
}> = ({ user, setAction }) => {
  const [role, setRole] = useState("");

  const handleUpdateProfile = async () => {
    let UpdateProfile = new UpdateProfileController();
    let response = await UpdateProfile.updateProfile(user.userid, role);
    if (response?.status == 200) {
      toast("Successfully updated user profile");
      setAction("");
    } else {
      toast("Failed to update user profile");
    }
  };

  return (
    <div className="bg-neutral-300 w-10/12 h-4/5 flex p-10 mx-auto my-auto">
      <div className="text-lg mr-4">Username: {user.username}</div>
      <div className="flex flex-col mx-4 items-center">
        <input
          className="mb-2 px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
          placeholder="New Role"
          onChange={(event) => setRole(event.currentTarget.value)}
        />
        <button
          className="text-white my-2 mx-2 px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
          onClick={handleUpdateProfile}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
