import Cart from "../entity/Cart";
import OrderItem from "../typings/OrderItem";

export default class RemoveCartItemController {
  private tablenum: number;
  constructor(tablenum: number) {
    this.tablenum = tablenum;
  }
  public async removeItem(item: OrderItem) {
    let cart = new Cart(this.tablenum);
    return await cart.deleteItem(item);
  }
}
