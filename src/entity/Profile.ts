import axios from "axios";

export default class Profile {
  private userid?: number;
  private role?: string;

  constructor(userid?: number, role?: string) {
    this.userid = userid;
    this.role = role;
  }

  public async getUserRoles() {
    return await axios
      .get(`http://localhost:1337/roles/`)
      .then((response) => response)
      .catch((err) => err);
  }

  public async searchProfile(query: string) {
    return await axios
      .post("http://localhost:1337/roles/search", {
        query: query,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async updateProfile() {
    return await axios
      .put(`http://localhost:1337/roles/${this.userid}`, {
        role: this.role,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async removeProfile() {
    return await axios
      .delete(`http://localhost:1337/roles/${this.userid}`)
      .then((response) => response)
      .catch((err) => err);
  }
}
