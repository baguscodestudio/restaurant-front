import Order from "../entity/Order";

export default class UpdateOrderStatusController {
  public async updateOrderStatus(orderid: number) {
    let order = new Order(undefined, undefined);
    return await order.updateOrderStatus(orderid);
  }
}
