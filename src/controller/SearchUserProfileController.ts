import Profile from "../entity/Profile";

export default class SearchUserProfileController {
  public async searchProfile(query: string) {
    let profile = new Profile();
    return await profile.searchProfile(query);
  }
}
