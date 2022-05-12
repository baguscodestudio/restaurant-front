import axios from "axios";
import OrderItem from "../typings/OrderItem";

export default class Cart {
  private tablenum: number;

  constructor(tablenum: number) {
    this.tablenum = tablenum;
  }

  public async getCart() {
    return await axios
      .get(`http://localhost:1337/cart/${this.tablenum}`)
      .then((response) => response)
      .catch((err) => console.log("error occured", err));
  }

  public async addItem(item: OrderItem) {
    return await axios
      .post(`http://localhost:1337/cart/${this.tablenum}`, {
        item: item,
      })
      .then((response) => response)
      .catch((err) => console.log("error occured", err));
  }

  public async deleteItem(item: OrderItem) {
    return await axios
      .delete(`http://localhost:1337/cart/${this.tablenum}/${item.itemid}`)
      .then((response) => response)
      .catch((err) => console.log("error occured", err));
  }

  public async updateItem(item: OrderItem) {
    return await axios
      .put(`http://localhost:1337/cart/${this.tablenum}`, {
        item: item,
      })
      .then((response) => response)
      .catch((err) => console.log("error occured", err));
  }
}
