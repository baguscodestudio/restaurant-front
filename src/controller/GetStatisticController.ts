import Order from "../entity/Order";
import CartComplete from "../typings/CartComplete";
import Customers from "../typings/Customers";
import OrderComplete from "../typings/OrderComplete";

export default class GetStatisticController {
  public async getStatistic() {
    let order = new Order();
    let data = await order.fetchCompletedOrders();
    let orders = data.data.orders as OrderComplete[];
    let carts = data.data.carts as CartComplete[];
    let customers: Customers = {};
    let lastTotalVisit = 0;
    let totalItems: { [key: string]: number } = {};
    orders.map((order, index) => {
      customers[order.email] = {
        spendings: [],
        orders: [],
        lastVisit: 0,
        averageSpending: 0,
        favoriteMenu: "",
      };
      customers[order.email].spendings?.push(order.price);
      carts.map((cart) => {
        if (cart.orderid == order.orderid) {
          customers[order.email].orders?.push(cart);
        }
      });
      let visit = new Date(Date.parse(order.visit));
      let Difference_In_Time = new Date().getTime() - visit.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      let lastVisit = customers[order.email].lastVisit;
      if (lastVisit) {
        if (lastVisit > Difference_In_Days) {
          customers[order.email].lastVisit = Difference_In_Days;
        }
      } else {
        customers[order.email].lastVisit = Difference_In_Days;
      }
    });
    let totalSpendCustomer = 0;
    Object.keys(customers).map((email, index) => {
      let total = 0;
      let items: { [key: string]: number } = {};
      customers[email].spendings?.map((spend) => (total += spend));
      customers[email].averageSpending =
        total / customers[email].spendings!.length;
      totalSpendCustomer += total / customers[email].spendings!.length;
      customers[email].orders?.map((order) => {
        items[order.name] = 0;
      });
      customers[email].orders?.map((order) => {
        items[order.name] = items[order.name] + order.quantity;
      });
      let favorite = {
        name: "",
        quantity: 0,
      };
      Object.keys(items).map((name) => {
        if (totalItems[name]) {
          totalItems[name] += items[name];
        } else {
          totalItems[name] = items[name];
        }
        if (items[name] > favorite.quantity) {
          favorite.name = name;
          favorite.quantity = items[name];
        }
      });
      customers[email].favoriteMenu = favorite.name;
      lastTotalVisit += customers[email].lastVisit!;
    });
    let mostFavorite = {
      name: "",
      quantity: 0,
    };
    Object.keys(totalItems).map((name) => {
      if (totalItems[name] > mostFavorite.quantity) {
        mostFavorite.name = name;
        mostFavorite.quantity = totalItems[name];
      }
    });
    let customerLength = Object.keys(customers).length;
    return {
      customers: customers,
      averageSpending: totalSpendCustomer / customerLength,
      favorite: mostFavorite.name,
      visitAverage: lastTotalVisit / customerLength,
    };
  }
}
