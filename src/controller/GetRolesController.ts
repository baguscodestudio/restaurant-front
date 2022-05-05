import Profile from "../entity/Profile";

export default class GetRolesController {
  public async getRoles() {
    let profile = new Profile();
    let response = await profile.getUserRoles();
    return response;
  }
}
