import Item from "../entity/Item";
import MenuItem from "../typings/Item";

// controller title
export default class CreateItemController {
  // functions
  public async createItem(newItem: MenuItem) {
    let item = new Item();
    return await item.storeMenuItem(newItem);
  }
}
