import Order from "../entity/Order";

export default class GetOrdersController {
  public async fetchOrders() {
    let order = new Order();
    return await order.fetchOrders();
  }
}
