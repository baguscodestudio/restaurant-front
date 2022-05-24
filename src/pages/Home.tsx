import { useContext } from "react";
import { useState, useEffect } from "react";
import ViewMenuItems from "./ViewMenuItems";
import { TableContext } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CreatePaymentController from "../controller/CreatePaymentController";
import Order from "../typings/Order";

const Home = () => {
  const deadline = new Date(2022, 4, 29);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const { tablenum } = useContext(TableContext);
  const [order, setOrder] = useState<Order>();
  const navigate = useNavigate();

  const getOrder = async () => {
    let GetOrder = new CreatePaymentController();
    let response = await GetOrder.getOrder(tablenum);
    if (response.status === 200) {
      setOrder(response.data);
    } else {
      toast.error("You do not have any order on going!");
      navigate("/");
    }
  };

  const makePayment = () => {
    navigate(`/payment/${tablenum}`);
  };

  const getTotal = () => {
    let total = 0;
    order?.items.map((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };

  useEffect(() => {
    getOrder();
    let inter = setInterval(() => {
      let currentDate = new Date();
      let time_difference = deadline.getTime() - currentDate.getTime();
      setDays(Math.floor(time_difference / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time_difference / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time_difference / (1000 * 60)) % 60));
      setSeconds(Math.floor((time_difference / 1000) % 60));
    }, 1000);
    return () => {
      clearInterval(inter);
    };
  }, []);

  return (
    <>
      <div className="m-auto">
        <div>
          <ViewMenuItems />
        </div>
        <div className="bg-neutral-300 w-64 h-96 rounded-lg p-4 flex flex-col">
          {order?.items.map((item, index) => (
            <div className="inline-flex w-full justify-between">
              <span>{item.name}</span>
              <span>x{item.quantity}</span>
            </div>
          ))}
          <div className="mt-auto mb-4 font-semibold">{`Table number: ${tablenum}`}</div>
          <div className="mb-4 font-semibold">{`Subtotal: $${getTotal()}`}</div>
        </div>
      <button
        onClick={makePayment}
        className="text-white mx-2 px-4 py-4 text-lg rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
      >
        Pay
      </button>
    </div>
    </>
  );
};

export default Home;
