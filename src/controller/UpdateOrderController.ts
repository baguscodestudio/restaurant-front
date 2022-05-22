import Order from "../entity/Order";
import OrderItem from "../typings/OrderItem";
import Item from "../entity/Item";

export default class UpdateOrderController {
  public async updateOrder(orderid: number, total: number, items: OrderItem[]) {
    let order = new Order();
    return await order.updateOrder(orderid, total, items);
  }

  public async getMenuItems() {
    let item = new Item();
    return await item.getItems();
  }
}
