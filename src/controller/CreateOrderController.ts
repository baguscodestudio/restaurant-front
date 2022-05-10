import Order from "../entity/Order";

export default class CreateOrderController {
  public async createOrder(tablenum: number, price: number, status: string) {
    let order = new Order(tablenum, price, status);
    return await order.createOrder();
  }
}
