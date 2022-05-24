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
      .get(`${import.meta.env.VITE_REST_URL}/roles/`)
      .then((response) => response)
      .catch((err) => err);
  }

  public async searchProfile(query: string) {
    return await axios
      .post(`${import.meta.env.VITE_REST_URL}/roles/search`, {
        query: query,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async updateProfile() {
    return await axios
      .put(`${import.meta.env.VITE_REST_URL}/roles/${this.userid}`, {
        role: this.role,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async removeProfile() {
    return await axios
      .delete(`${import.meta.env.VITE_REST_URL}/roles/${this.userid}`)
      .then((response) => response)
      .catch((err) => err);
  }
}
