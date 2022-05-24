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
      .get(`${import.meta.env.REST_URL}/items`)
      .then((response) => response)
      .catch((err) => err);
  }

  public async searchItem(query: string) {
    return await axios
      .post(`${import.meta.env.REST_URL}/items/search`, {
        query: query,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async storeMenuItem(newItem: MenuItem) {
    return await axios
      .post(`${import.meta.env.REST_URL}/items`, newItem)
      .then((response) => response)
      .catch((err) => err);
  }

  public async updateItem(newItem: MenuItem) {
    return await axios
      .put(`${import.meta.env.REST_URL}/items/${newItem.itemid}`, newItem)
      .then((response) => response)
      .catch((err) => err);
  }

  public async removeItem() {
    return await axios
      .delete(`${import.meta.env.REST_URL}/items/${this.itemid}`)
      .then((response) => response)
      .catch((err) => err);
  }
}
