import Item from "../entity/Item";

export default class SearchMenuItemStaffController {
  public async searchMenuItem(query: string) {
    let item = new Item();
    return await item.searchItem(query);
  }
}
