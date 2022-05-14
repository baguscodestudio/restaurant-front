import Order from "../entity/Order";
import OrderItem from "../typings/OrderItem";

export default class UpdateOrderController {
  public async updateOrder(orderid: number, total: number, items: OrderItem[]) {
    let order = new Order();
    return await order.updateOrder(orderid, total, items);
  }
}
