import Order from "../entity/Order";

export default class RemoveOrderController {
  public async removeOrder(orderid: number) {
    let order = new Order();
    return await order.deleteOrder(orderid);
  }
}
