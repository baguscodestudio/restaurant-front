import CartComplete from "./CartComplete";
export default interface Customers {
  [email: string]: {
    spendings?: number[];
    lastVisit?: number;
    favoriteMenu?: string;
    orders?: CartComplete[];
    averageSpending?: number;
  };
}
