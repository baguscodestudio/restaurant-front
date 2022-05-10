import Cart from "../entity/Cart";
import OrderItem from "../typings/OrderItem";

export default class UpdateCartItemController {
  private tablenum: number;
  constructor(tablenum: number) {
    this.tablenum = tablenum;
  }
  public async updateItem(item: OrderItem) {
    let cart = new Cart(this.tablenum);
    return await cart.updateItem(item);
  }
}
