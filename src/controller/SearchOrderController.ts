import Order from "../entity/Order";

export default class SearchOrderController {
  public async searchOrder(query: string) {
    let order = new Order();
    return await order.searchOrder(query);
  }
}
