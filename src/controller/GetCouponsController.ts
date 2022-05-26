import Coupon from "../entity/Coupon";

export default class GetCouponsController {
  public async fetchCoupons() {
    let coupon = new Coupon();
    return await coupon.fetchCoupons();
  }
}
