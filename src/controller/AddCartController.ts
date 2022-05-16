import Cart from "../entity/Cart";
import OrderItem from "../typings/OrderItem";

export default class AddCartController {
  public async addCart(tablenum: number, items: OrderItem[]) {
    let cart = new Cart(tablenum);
    let responses = await Promise.all(
      items.map(async (item) => {
        if (item.quantity > 0) {
          return await cart.addItem(item);
        }
      })
    );
    for (let i = 0; i < responses.length; i++) {
      if (responses[i].status !== 200) {
        return false;
      }
    }
    return true;
  }
}
