import Item from "../entity/Item";

export default class SearchMenuItemController {
  public async searchMenuItem(query: string) {
    let item = new Item();
    return await item.searchItem(query);
  }
}
