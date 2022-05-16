import User from "../entity/User";

export default class SearchUserController {
  public async searchUser(query: string) {
    let user = new User();
    return await user.searchUser(query);
  }
}
