import User from "../entity/User";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

export default class LoginController {
  public async handleLogin(
    username: String,
    password: String
  ): Promise<AxiosResponse> {
    const user = new User(username, password);
    let response = await user.login();
    return response!;
  }
}
