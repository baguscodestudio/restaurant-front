import Item from "../entity/Item";

export default class RemoveItemController {
  public async removeItem(itemid: number) {
    let item = new Item(itemid);
    return await item.removeItem();
  }
}
