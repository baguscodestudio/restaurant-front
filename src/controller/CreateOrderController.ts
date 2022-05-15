import Order from "../entity/Order";

export default class CreateOrderController {
  public async createOrder(tablenum: number, price: number) {
    let order = new Order(tablenum, price);
    return await order.createOrder();
  }
}
