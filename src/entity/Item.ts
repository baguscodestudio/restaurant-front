import axios from "axios";
import MenuItem from "../typings/Item";

//entity title
export default class Item {
  private itemid?: number;

  constructor(itemid?: number) {
    this.itemid = itemid;
  }

  //functions
  public async getItems() {
    return await axios
      .get("http://localhost:1337/items")
      .then((response) => response)
      .catch((err) => err);
  }

  public async searchItem(query: string) {
    return await axios
      .post("http://localhost:1337/items/search", {
        query: query,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async storeMenuItem(newItem: MenuItem) {
    return await axios
      .post("http://localhost:1337/items", newItem)
      .then((response) => response)
      .catch((err) => err);
  }

  public async updateItem(newItem: MenuItem) {
    return await axios
      .put(`http://localhost:1337/items/${newItem.itemid}`, newItem)
      .then((response) => response)
      .catch((err) => err);
  }

  public async removeItem() {
    return await axios
      .delete(`http://localhost:1337/items/${this.itemid}`)
      .then((response) => response)
      .catch((err) => err);
  }
}
