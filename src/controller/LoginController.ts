import User from "../entity/User";

export default class LoginController {
  public async handleLogin(username: String, password: String) {
    const user = new User(username, password);
    let response = await user.login();
    return response!;
  }
}
