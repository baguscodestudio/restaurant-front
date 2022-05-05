import axios from "axios";

export default class Profile {
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
}
