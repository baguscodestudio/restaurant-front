import axios, { AxiosError, AxiosResponse } from "axios";
import OrderItem from "../typings/OrderItem";

export default class Order {
  private tablenum?: number;
  private price?: number;
  private status?: string;

  constructor(tablenum?: number, price?: number, status?: string) {
    this.tablenum = tablenum;
    this.price = price;
    this.status = status;
  }

  public async fetchOrders() {
    return await axios
      .get(`http://localhost:1337/order/`)
      .then((response) => response)
      .catch((err) => err);
  }

  public async fetchOrderTable() {
    return await axios
      .get(`http://localhost:1337/order/${this.tablenum}`)
      .then((response) => response)
      .catch((err) => err);
  }

  public async createOrder() {
    return await axios
      .post("http://localhost:1337/order/", {
        tablenum: this.tablenum,
        price: this.price,
        status: this.status,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async updateOrder(orderid: number, price: number, items: OrderItem[]) {
    return await axios
      .put(`http://localhost:1337/order/${orderid}`, {
        price: price,
        items: items,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async updateOrderStatus(orderid: number) {
    return await axios
      .put(`http://localhost:1337/order/status/${orderid}`, {
        status: this.status,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async deleteOrder(orderid: number) {
    return await axios
      .delete(`http://localhost:1337/order/${orderid}`)
      .then((response) => response)
      .catch((err) => err);
  }
}
