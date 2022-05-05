import User from "../entity/User";

export default class CreateUserController {
  public async createUser(username: string, password: string) {
    let user = new User(username, password);
    return await user.createUser();
  }
}
