import React, { useState } from "react";
import { toast } from "react-toastify";
import CreateCouponController from "../controller/CreateCouponController";
import CouponType from "../typings/CouponType";

const CreateItem = ({
  setAction,
  fetchCoupons,
}: {
  fetchCoupons: () => void;
  setAction: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [newCoupon, setCoupon] = useState<CouponType>({
    code: "",
    discount: 0,
    expire: new Date(),
  });

  const storeCoupon = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (newCoupon.code === "" || newCoupon.discount === 0) {
      toast.error("Please fill in all highlighted fields");
    } else {
      let CreateCoupon = new CreateCouponController();
      let response = await CreateCoupon.createCoupon(
        newCoupon.code,
        newCoupon.discount,
        newCoupon.expire
      );
      if (response?.status === 200) {
        toast(`Successfully created ${newCoupon.code}!`);
        fetchCoupons();
        setAction("");
      } else {
        toast.error(`Unable to save, please try again`);
      }
    }
  };

  return (
    <div className="bg-neutral-300 w-10/12 h-4/5 flex p-10 mx-auto my-auto">
      <form
        onSubmit={(event) => storeCoupon(event)}
        className="flex flex-col mx-4 items-center"
      >
        <input
          className="mb-2 px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
          placeholder="Coupon code"
          onChange={(event) =>
            setCoupon({ ...newCoupon, code: event.currentTarget.value })
          }
        />
        <input
          className="mb-2 px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
          placeholder="Discount (percentage)"
          type="number"
          onChange={(event) => {
            setCoupon({
              ...newCoupon,
              discount: parseInt(event.currentTarget.value),
            });
          }}
        />
        <div>Expiry</div>
        <input
          className="mb-2 px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
          type="date"
          onChange={(event) =>
            setCoupon({
              ...newCoupon,
              expire: new Date(event.currentTarget.value),
            })
          }
        />
        <button
          className="text-white my-2 mx-2 px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
          onClick={storeCoupon}
        >
          Add Coupon
        </button>
      </form>
    </div>
  );
};

export default CreateItem;
