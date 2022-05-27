import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CreatePaymentController from "../controller/CreatePaymentController";
import Order from "../typings/Order";

const Payment = () => {
  const [order, setOrder] = useState<Order>();
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const handlePayment = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (email === "" || card === "") {
      toast.error("Invalid payment details, please try again.");
    } else {
      if (order) {
        let CreatePayment = new CreatePaymentController();
        let response = await CreatePayment.createPayment(order, email);
        if (response.status === 200) {
          toast("Successfully paid your order!");
          navigate("/");
        } else {
          toast.error("Failed to make payment!");
        }
      }
    }
  };

  const getOrder = async () => {
    let GetOrder = new CreatePaymentController();
    let response = await GetOrder.getOrder(parseInt(params.tablenum!));
    if (response.status === 200) {
      setOrder(response.data);
    } else {
      toast.error("You do not have any order on going!");
      navigate("/");
    }
  };

  useEffect(() => {
    getOrder();
  }, []);
  return (
    <>
      <div className="bg-neutral-300 w-10/12 h-4/5 flex p-10 mx-auto my-auto">
        <div className="flex flex-col mx-4 items-center">
          <div className="text-lg my-4">Table Number: {params.tablenum}</div>
          <div className="text-lg my-4">Payment Total: ${order?.total}</div>
        </div>
        <form
          onSubmit={(event) => handlePayment(event)}
          className="flex flex-col mx-4 items-center"
        >
          <input
            id="card-info"
            className="mb-2 px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
            placeholder="Credit/Debit Card"
            onChange={(event) => setCard(event.currentTarget.value)}
          />
          <input
            id="email"
            className="mb-2 px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
            placeholder="Your email"
            type="email"
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
          <button
            className="text-white my-2 mx-auto px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
            type="submit"
          >
            Pay
          </button>
        </form>
      </div>
    </>
  );
};

export default Payment;
