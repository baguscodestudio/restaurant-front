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
      .post(`${import.meta.env.VITE_REST_URL}/login`, {
        username: this.username,
        password: this.password,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async fetchUsers() {
    return await axios
      .get(`${import.meta.env.VITE_REST_URL}/useraccounts/`)
      .then((response) => response)
      .catch((err) => err);
  }

  public async searchUser(query: string) {
    return await axios
      .post(`${import.meta.env.VITE_REST_URL}/useraccounts/search`, {
        query: query,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async updateUsername(userid: number) {
    return await axios
      .put(`${import.meta.env.VITE_REST_URL}/useraccounts/username/${userid}`, {
        username: this.username,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async updatePassword(userid: number) {
    return await axios
      .put(`${import.meta.env.VITE_REST_URL}/useraccounts/password/${userid}`, {
        password: this.password,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async updateUser(userid: number) {
    return await axios
      .put(`${import.meta.env.VITE_REST_URL}/useraccounts/${userid}`, {
        username: this.username,
        password: this.password,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async deleteUser(userid: number) {
    return await axios
      .delete(`${import.meta.env.VITE_REST_URL}/useraccounts/${userid}`)
      .then((response) => response)
      .catch((err) => err);
  }

  public async createUser() {
    return await axios
      .post(`${import.meta.env.VITE_REST_URL}/register`, {
        username: this.username,
        password: this.password,
      })
      .then((response) => response)
      .catch((err) => err);
  }
}
