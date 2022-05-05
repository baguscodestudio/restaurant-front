import User from "../entity/User";

export default class DeleteUserController {
  public async deleteUser(userid: number) {
    let user = new User();
    return await user.deleteUser(userid);
  }
}
