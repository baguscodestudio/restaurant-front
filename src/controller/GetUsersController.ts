import User from "../entity/User";

export default class GetUsersController {
  public async getUsers() {
    let user = new User();
    let response = await user.fetchUsers();
    return response;
  }
}
