import Coupon from "../entity/Coupon";

export default class CreateCouponController {
  public async createCoupon(code: string, discount: number, date: Date) {
    let coupon = new Coupon(code);
    return await coupon.createCoupon(discount, date);
  }
}
