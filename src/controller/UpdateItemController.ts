import Item from "../entity/Item";
import MenuItem from "../typings/Item";

export default class UpdateItemController {
  public async updateItem(newItem: MenuItem) {
    let item = new Item();
    return await item.updateItem(newItem);
  }
}
