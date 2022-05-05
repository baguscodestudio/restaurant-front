import Profile from "../entity/Profile";
export default class UpdateProfileController {
  public async updateProfile(userid: number, role: string) {
    // if (role === "") return { success: false, message: "Role cannot be empty" };
    let profile = new Profile(userid, role);
    return await profile.updateProfile();
  }
}
