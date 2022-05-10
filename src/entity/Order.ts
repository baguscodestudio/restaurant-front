import axios from "axios";

export default class Order {
  private tablenum?: number;
  private price?: number;
  private status?: string;

  constructor(tablenum?: number, price?: number, status?: string) {
    this.tablenum = tablenum;
    this.price = price;
    this.status = status;
  }

  public async createOrder() {
    return await axios
      .post("http://localhost:1337/order/", {
        tablenum: this.tablenum,
        price: this.price,
        status: this.status,
      })
      .then((response) => response)
      .catch((err) => console.log("error occured", err));
  }

  public async updateOrder() {
    return await axios.put(`http://localhost:1337/order/${this.tablenum}`, {
      status: this.status,
    });
  }
}
