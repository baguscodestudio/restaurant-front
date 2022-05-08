import Item from "../entity/Item";
import MenuItem from "../typings/Item";

export default class CreateItemController {
  public async createItem(newItem: MenuItem) {
    let item = new Item();
    return await item.createItem(newItem);
  }
}
