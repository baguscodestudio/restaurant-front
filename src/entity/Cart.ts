import axios from "axios";
import OrderItem from "../typings/OrderItem";

export default class Cart {
  private tablenum: number;

  constructor(tablenum: number) {
    this.tablenum = tablenum;
  }

  public async getCart() {
    return await axios
      .get(`${import.meta.env.VITE_REST_URL}/cart/${this.tablenum}`)
      .then((response) => response)
      .catch((err) => err);
  }

  public async addItem(item: OrderItem) {
    return await axios
      .post(`${import.meta.env.VITE_REST_URL}/cart/${this.tablenum}`, {
        item: item,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async deleteItem(item: OrderItem) {
    return await axios
      .delete(
        `${import.meta.env.VITE_REST_URL}/cart/${this.tablenum}/${item.itemid}`
      )
      .then((response) => response)
      .catch((err) => err);
  }

  public async updateItem(item: OrderItem) {
    return await axios
      .put(`${import.meta.env.VITE_REST_URL}/cart/${this.tablenum}`, {
        item: item,
      })
      .then((response) => response)
      .catch((err) => err);
  }
}
