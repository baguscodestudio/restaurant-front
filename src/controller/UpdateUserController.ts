import User from "../entity/User";

export default class UpdateUserController {
  public async updateUser(username: string, password: string, userid: number) {
    let user = new User(username, password);
    if (password == "" && username !== "") {
      return await user.updateUsername(userid);
    } else if (username == "" && password !== "") {
      return await user.updatePassword(userid);
    } else if (username !== "" && password !== "") {
      return await user.updateUser(userid);
    }
  }
}
