import User from "../entity/User";

export default class UpdateUserController {
  public async updateUser(username: string, password: string, userid: number) {
    let user = new User(username, password);
    if (password == "") {
      return await user.updateUsername(userid);
    } else {
      return await user.updateUser(userid);
    }
  }
}
