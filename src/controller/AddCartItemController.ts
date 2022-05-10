import Cart from "../entity/Cart";
import OrderItem from "../typings/OrderItem";

export default class AddCartItemController {
  private tablenum: number;
  constructor(tablenum: number) {
    this.tablenum = tablenum;
  }
  public async addCartItem(item: OrderItem) {
    let cart = new Cart(this.tablenum);
    return await cart.addItem(item);
  }
}
