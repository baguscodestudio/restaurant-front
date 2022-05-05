import Profile from "../entity/Profile";

export default class RemoveProfileController {
  public async removeProfile(userid: number) {
    let profile = new Profile(userid);
    return await profile.removeProfile();
  }
}
