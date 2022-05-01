import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("Bagus");
  const handleLogin = () => {
    axios
      .post("http://localhost:1337/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.data.token);
          localStorage.setItem("accessToken", response.data.data.token);

          console.log(response.data);
        } else {
          console.log("failed");
        }
      });
  };

  const handleRegister = () => {
    axios
      .post("http://localhost:1337/register", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
        } else {
          console.log("failed");
        }
      });
  };
  return (
    <>
      <div className="mx-auto my-2">
        <input
          className="px-4"
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </div>
      <div className="mx-auto my-2">
        <input
          type="password"
          className="px-4"
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </div>
      <div className="mx-auto inline-flex my-2">
        <button
          className="mx-2 px-4 py-2 rounded-lg bg-slate-600"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="mx-2 px-4 py-2 rounded-lg bg-slate-600"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </>
  );
};

export default Login;
