import Item from "../entity/Item";

export default class GetItemsController {
  public async getMenuItems() {
    let item = new Item();
    return await item.getItems();
  }
}
