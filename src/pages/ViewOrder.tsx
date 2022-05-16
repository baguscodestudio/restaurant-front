import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TableContext } from "../App";
import Order from "../typings/Order";

import GetOrderTableController from "../controller/GetOrderTableController";

const ViewOrder = () => {
  const { tablenum } = useContext(TableContext);
  const [order, setOrder] = useState<Order>();
  const navigate = useNavigate();

  const getOrder = async () => {
    let GetOrder = new GetOrderTableController();
    let response = await GetOrder.getOrder(tablenum);
    if (response.status === 200) {
      setOrder(response.data);
    } else {
      toast.error("You do not have any order on going!");
      navigate("/");
    }
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
  }, []);
  return (
    <div className="m-auto">
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
    </div>
  );
};

export default ViewOrder;
