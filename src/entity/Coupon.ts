import axios from "axios";

export default class Coupon {
  private code?: string;

  constructor(code?: string) {
    this.code = code;
  }

  public async fetchCoupons() {
    return await axios
      .get(`${import.meta.env.VITE_REST_URL}/coupon/`)
      .then((response) => response)
      .catch((err) => err);
  }

  public async createCoupon(discount: number, expire: Date) {
    return await axios
      .post(`${import.meta.env.VITE_REST_URL}/coupon/${this.code}`, {
        discount: discount,
        expire: expire,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  public async deleteCoupon() {
    return await axios
      .delete(`${import.meta.env.VITE_REST_URL}/coupon/${this.code}`)
      .then((response) => response)
      .catch((err) => err);
  }
}
