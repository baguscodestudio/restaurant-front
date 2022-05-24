import React, { useState } from "react";
import { toast } from "react-toastify";
import CreateUserController from "../controller/CreateUserController";

const CreateUser: React.FC<{
  getUsers: () => void;
  setAction: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setAction, getUsers }) => {
  const [newUsername, setUsername] = useState("");
  const [newPassword, setPassword] = useState("");

  const handleCreate = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (newUsername === "" || newPassword === "") {
      toast.error("Please fill in all highlighted fields");
    } else {
      let CreateUser = new CreateUserController();
      let response = await CreateUser.createUser(newUsername, newPassword);
      if (response?.status == 200) {
        toast("Successfully created user");
        getUsers();
        setAction("");
      } else {
        toast("Unable to create account, please try again");
      }
    }
  };

  return (
    <div className="bg-neutral-300 w-10/12 h-4/5 flex p-10 mx-auto my-auto">
      <form
        onSubmit={(event) => handleCreate(event)}
        className="flex flex-col mx-4 items-center"
      >
        <input
          className="mb-2 px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
          placeholder="New Username"
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
        <input
          className="my-2 px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
          type="password"
          placeholder="New Password"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <button
          className="text-white my-2 mx-2 px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
          onClick={handleCreate}
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
