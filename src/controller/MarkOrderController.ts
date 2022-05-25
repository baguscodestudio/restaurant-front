import Order from "../entity/Order";
import OrderType from "../typings/Order";

export default class MarkOrderController {
  public async updateOrderStatus(order: OrderType, email: string) {
    let OrderEntity = new Order(0, 0, order.orderid);
    return await OrderEntity.markOrder(order, email);
  }
}
