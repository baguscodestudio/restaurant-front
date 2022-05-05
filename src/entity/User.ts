import axios from "axios";

export default class User {
  private username: String;
  private password: String;

  constructor(username: String, password: String) {
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
      });
  }
}
