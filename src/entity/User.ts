import axios from "axios";

export default class User {
  private username?: String;
  private password?: String;

  constructor(username?: String, password?: String) {
    this.username = username;
    this.password = password;
  }

  public async login() {
    return await axios
      .post("http://localhost:1337/login", {
        username: this.username,
        password: this.password,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log("error occured", err);
        return err;
      });
  }

  public async fetchUsers() {
    return await axios
      .get("http://localhost:1337/useraccounts/")
      .then((response) => response)
      .catch((err) => console.log("error occured", err));
  }

  public async updateUsername(userid: number) {
    return await axios
      .put(`http://localhost:1337/useraccounts/username/${userid}`, {
        username: this.username,
      })
      .then((response) => response)
      .catch((err) => console.log("error occured", err));
  }

  public async updatePassword(userid: number) {
    return await axios
      .put(`http://localhost:1337/useraccounts/password/${userid}`, {
        password: this.password,
      })
      .then((response) => response)
      .catch((err) => console.log("error occured", err));
  }

  public async updateUser(userid: number) {
    return await axios
      .put(`http://localhost:1337/useraccounts/${userid}`, {
        username: this.username,
        password: this.password,
      })
      .then((response) => response)
      .catch((err) => console.log("error occured", err));
  }

  public async deleteUser(userid: number) {
    return await axios
      .delete(`http://localhost:1337/useraccounts/${userid}`)
      .then((response) => response)
      .catch((err) => console.log("error occured", err));
  }

  public async createUser() {
    return await axios
      .post("http://localhost:1337/register", {
        username: this.username,
        password: this.password,
      })
      .then((response) => response)
      .catch((err) => console.log("error occured", err));
  }
}
