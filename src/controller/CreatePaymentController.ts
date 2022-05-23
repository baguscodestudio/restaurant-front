import Order from "../entity/Order";
import OrderType from "../typings/Order";

export default class CreatePaymentController {
  public async createPayment(order: OrderType, email: string) {
    let OrderEntity = new Order(undefined, undefined, order.orderid);
    return await OrderEntity.markOrder(order, email);
  }
}
