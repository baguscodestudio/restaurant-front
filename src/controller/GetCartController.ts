import Cart from "../entity/Cart";

export default class GetCartController {
  public async getCart(tablenum: number) {
    let cart = new Cart(tablenum);
    return await cart.getCart();
  }
}
