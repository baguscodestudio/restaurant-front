import Coupon from "../entity/Coupon";

export default class RemoveCouponController {
  public async deleteCoupon(code: string) {
    let coupon = new Coupon(code);
    return await coupon.deleteCoupon();
  }
}
