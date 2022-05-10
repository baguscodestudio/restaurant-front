import Order from "../entity/Order";

export default class UpdateOrderController {
  public async updateOrder(tablenum: number, status: string) {
    let order = new Order(tablenum, undefined, status);
    return await order.updateOrder();
  }
}
