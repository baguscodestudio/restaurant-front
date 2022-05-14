import Order from "../entity/Order";

export default class UpdateOrderStatusController {
  public async updateOrderStatus(orderid: number, status: string) {
    let order = new Order(undefined, undefined, status);
    return await order.updateOrderStatus(orderid);
  }
}
