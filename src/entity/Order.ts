import axios from "axios";
import OrderItem from "../typings/OrderItem";
import OrderType from "../typings/Order";

export default class Order {
  private tablenum?: number;
  private price?: number;
  private orderid?: number;

  constructor(tablenum?: number, price?: number, orderid?: number) {
    this.tablenum = tablenum;
    this.price = price;
    this.orderid = orderid;
  }

  public async fetchOrders() {
    return await axios
      .get(`${import.meta.env.REST_URL}/order/`)
      .then((response) => response)
      .catch((err) => err);
  }

  public async fetchOrderTable() {
    return await axios
      .get(`${import.meta.env.REST_URL}/order/${this.tablenum}`)
      .then((response) => response)
      .catch((err) => err);
  }

  public async fetchCompletedOrders() {
    return await axios
      .get(`${import.meta.env.REST_URL}/order/completedOrders`)
      .then((response) => response)
      .catch((err) => err);
  }

  public async searchOrder(query: string) {
    return await axios
      .post(`${import.meta.env.REST_URL}/order/search`, {
        query: query,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async createOrder() {
    return await axios
      .post(`${import.meta.env.REST_URL}/order/`, {
        tablenum: this.tablenum,
        price: this.price,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async markOrder(order: OrderType, email: string) {
    return await axios
      .post(`${import.meta.env.REST_URL}/order/complete/${this.orderid}`, {
        order: order,
        email: email,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async updateOrder(orderid: number, price: number, items: OrderItem[]) {
    return await axios
      .put(`${import.meta.env.REST_URL}/order/${orderid}`, {
        price: price,
        items: items,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async deleteOrder(orderid: number) {
    return await axios
      .delete(`${import.meta.env.REST_URL}/order/${orderid}`)
      .then((response) => response)
      .catch((err) => err);
  }
}
