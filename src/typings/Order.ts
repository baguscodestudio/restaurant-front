import OrderItem from "./OrderItem";

export default interface Order {
  orderid: number;
  tablenum: number;
  total: number;
  items: OrderItem[];
}
