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

  public async searchOrder(query: string) {
    return await axios
      .post("http://localhost:1337/order/search", {
        query: query,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async createOrder() {
    return await axios
      .post("http://localhost:1337/order/", {
        tablenum: this.tablenum,
        price: this.price,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async markOrder(order: OrderType) {
    return await axios
      .post(`http://localhost:1337/order/complete/${this.orderid}`, {
        order: order,
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

  public async updateOrderStatus(orderid: number) {}

  public async deleteOrder(orderid: number) {
    return await axios
      .delete(`http://localhost:1337/order/${orderid}`)
      .then((response) => response)
      .catch((err) => err);
  }
}
