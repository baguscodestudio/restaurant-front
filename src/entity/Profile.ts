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
      .get(`http://localhost:1337/getRoles`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log("Error occured", err);
      });
  }

  public async updateProfile() {
    return await axios
      .post("http://localhost:1337/updateRole", {
        userid: this.userid,
        role: this.role,
      })
      .then((response) => response)
      .catch((err) => console.log("error occured", err));
  }

  public async removeProfile() {
    return await axios
      .post("http://localhost:1337/removeRole", {
        userid: this.userid,
      })
      .then((response) => response)
      .catch((err) => console.log("error occured", err));
  }
}
