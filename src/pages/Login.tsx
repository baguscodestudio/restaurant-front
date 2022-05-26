import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LoginController from "../controller/LoginController";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    let Login = new LoginController();
    let response = await Login.handleLogin(username, password);
    if (response?.status === 200) {
      localStorage.setItem("accessToken", response.data.data.token);
      localStorage.setItem("userData", JSON.stringify(response.data.data.user));
      toast("Successfully logged in!", {
        position: "bottom-left",
        progress: undefined,
      });
      navigate("/dashboard");
    } else {
      toast.error(response?.response.data.message, {
        position: "bottom-left",
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div className="text-2xl mx-auto mt-40 mb-2 bg-neutral-300 w-2/3 sm:w-1/4 h-36 flex justify-center items-center">
        CSIT314 Restaurant
      </div>
      <form
        onSubmit={(event) => handleLogin(event)}
        className="w-full flex flex-col"
      >
        <div className="mx-auto mb-2 mt-12">
          <input
            id="login-username"
            className="px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
            placeholder="Username"
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </div>
        <div className="mx-auto my-2">
          <input
            id="login-password"
            className="px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
            placeholder="Password"
            type="password"
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </div>
        <div className="mx-auto inline-flex my-2 text-white">
          <button
            className="mx-2 px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
            onClick={(event) => handleLogin(event)}
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
