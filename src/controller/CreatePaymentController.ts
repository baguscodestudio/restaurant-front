import Order from "../entity/Order";
import OrderType from "../typings/Order";

export default class CreatePaymentController {
  public async createPayment(order: OrderType, email: string) {
    let OrderEntity = new Order(0, 0, order.orderid);
    return await OrderEntity.markOrder(order, email);
  }
  
  public async getOrder(tablenum: number) {
    let order = new Order(tablenum);
    return await order.fetchOrderTable();
  }
}
