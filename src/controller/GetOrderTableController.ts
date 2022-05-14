import Order from "../entity/Order";

export default class GetOrderTableController {
  public async getOrder(tablenum: number) {
    let order = new Order(tablenum);
    return await order.fetchOrderTable();
  }
}
