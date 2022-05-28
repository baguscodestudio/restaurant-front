import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import { Dialog } from "@headlessui/react";

import GetCouponsController from "../controller/GetCouponsController";
import RemoveCouponController from "../controller/RemoveCouponController";
import CouponType from "../typings/CouponType";
import CreateCoupon from "./CreateCoupon";

// boundary title
const ManageCoupon = () => {
  const user = useContext(UserContext);
  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const [select, setSelect] = useState(-1);
  const [action, setAction] = useState("");
  const [open, setOpen] = useState(false);

  const fetchCoupons = async () => {
    let GetCoupons = new GetCouponsController();
    let response = await GetCoupons.fetchCoupons();
    if (response?.status === 200) {
      setCoupons(response.data);
    } else {
      toast.error("An error occured while getting coupons");
    }
  };

  const handleRemove = async () => {
    if (select !== -1) {
      let RemoveCoupons = new RemoveCouponController();
      let response = await RemoveCoupons.deleteCoupon(coupons[select].code);
      if (response?.status === 200) {
        setOpen(false);
        toast("Successfully removed coupon");
        fetchCoupons();
      } else {
        toast.error("Failed to remove coupon!");
      }
    } else {
      toast.error("Select a coupon first!");
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  if (user.role == "manager" && action === "")
    return (
      <>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          as="div"
          className="relative z-10"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full coupons-center justify-center p-4 text-center">
              <Dialog.Panel className="w-full h-fit max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Are you sure you want to delete this coupon?
                </Dialog.Title>

                <div className="w-full inline-flex text-white mt-4">
                  <button
                    className="mx-2 px-2 py-1 rounded-md bg-neutral-700 hover:bg-neutral-500 transition-colors duration-150"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRemove}
                    className="mx-2 px-2 py-1 rounded-md bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
                  >
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
        <div className="inline-flex mt-10 mx-auto text-white sm:text-lg">
          <button
            className="mx-2 px-4 py-1 sm:py-4 sm:w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
            onClick={() => setAction("add")}
          >
            Add
          </button>
          <button
            className="mx-2 px-4 py-1 sm:py-4 sm:w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
            onClick={() => setOpen(true)}
          >
            Remove
          </button>
        </div>
        <div className="w-11/12 h-3/5 bg-neutral-300 mx-auto mt-2 mb-auto px-4 sm:px-10 py-4 text-base sm:text-lg flex flex-col">
          <table className="sm:w-1/3">
            <thead className="text-left">
              <tr className="h-4">
                <th>Coupon</th>
                <th>Discount</th>
                <th>Expire</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, index) => (
                <>
                  {index == select ? (
                    <tr
                      key={index}
                      className="text-white h-4 bg-[#27635e] hover:bg-[#134E4A] hover:cursor-pointer"
                      onClick={() => setSelect(index)}
                    >
                      <td>{coupon.code}</td>
                      <td>{coupon.discount}%</td>
                      <td>{`${new Date(coupon.expire).getDate()}-${
                        new Date(coupon.expire).getMonth() + 1
                      }-${new Date(coupon.expire).getFullYear()}`}</td>
                    </tr>
                  ) : (
                    <tr
                      key={index}
                      className="h-4 hover:bg-[#134E4A] hover:text-white hover:cursor-pointer"
                      onClick={() => setSelect(index)}
                    >
                      <td>{coupon.code}</td>
                      <td>{coupon.discount}%</td>
                      <td>{`${new Date(coupon.expire).getDate()}-${
                        new Date(coupon.expire).getMonth() + 1
                      }-${new Date(coupon.expire).getFullYear()}`}</td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  else if (user.role === "manager" && action === "add") {
    return (
      <>
        <button
          className="absolute bottom-10 left-10 bg-neutral-300 px-4 rounded-lg text-lg hover:bg-neutral-600 hover:scale-105 hover:text-white"
          onClick={() => setAction("")}
        >
          Back
        </button>
        <CreateCoupon setAction={setAction} fetchCoupons={fetchCoupons} />
      </>
    );
  } else return <Navigate to="/" />;
};

export default ManageCoupon;
