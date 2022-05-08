import axios from "axios";
import MenuItem from "../typings/Item";

export default class Item {
  private itemid?: number;

  constructor(itemid?: number) {
    this.itemid = itemid;
  }

  public async getItems() {
    return await axios
      .get("http://localhost:1337/items")
      .then((response) => response)
      .catch((err) => console.log("error occured", err));
  }

  public async createItem(newItem: MenuItem) {
    return await axios
      .post("http://localhost:1337/addItem", newItem)
      .then((response) => response)
      .catch((err) => console.log("error occured", err));
  }

  public async updateItem(newItem: MenuItem) {
    return await axios
      .post("http://localhost:1337/updateItem", newItem)
      .then((response) => response)
      .catch((err) => console.log("error occured", err));
  }

  public async removeItem() {
    return await axios
      .post("http://localhost:1337/removeItem", {
        itemid: this.itemid,
      })
      .then((response) => response)
      .catch((err) => console.log("error occured", err));
  }
}
