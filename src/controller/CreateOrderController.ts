import Cart from "../entity/Cart";
import Order from "../entity/Order";
import OrderItem from "../typings/OrderItem";
import Item from "../entity/Item";

export default class CreateOrderController {
  public async createOrder(
    tablenum: number,
    price: number,
    items: OrderItem[]
  ) {
    let cart = new Cart(tablenum);
    let success = true;
    let responses = await Promise.all(
      items.map(async (item) => {
        if (item.quantity > 0) {
          return await cart.addItem(item);
        }
      })
    );
    for (let i = 0; i < responses.length; i++) {
      if (responses[i]) {
        if (responses[i].status !== 200) {
          success = false;
        }
      }
    }
    if (success) {
      let order = new Order(tablenum, price);
      return await order.createOrder();
    } else {
      return { status: 400 };
    }
  }

  public async getMenuItems() {
    let item = new Item();
    return await item.getItems();
  }

  public async getOrder(tablenum: number) {
    let order = new Order(tablenum);
    return await order.fetchOrderTable();
  }
}
