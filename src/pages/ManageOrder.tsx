import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import GetOrderController from "../controller/GetOrdersController";
import RemoveOrderController from "../controller/RemoveOrderController";
import Order from "../typings/Order";
import UpdateOrder from "./UpdateOrder";

const ManageOrder = () => {
  const user = useContext(UserContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [action, setAction] = useState("");
  const [select, setSelect] = useState(-1);

  const handleDelete = async () => {
    let DeleteOrder = new RemoveOrderController();
    let response = await DeleteOrder.removeOrder(orders[select].orderid);
    if (response && response.status == 200) {
      toast("Successfully deleted order!");
      fetchOrders();
    } else {
      toast.error("An error occured while deleting order");
    }
  };

  const fetchOrders = async () => {
    let GetOrder = new GetOrderController();
    let response = await GetOrder.fetchOrders();

    if (response && response.status == 200) {
      setOrders(response.data);
    } else {
      toast.error("An error occured while getting orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (action == "" && user.role === "staff") {
    return (
      <>
        <div className="inline-flex mt-24 mx-auto text-white">
          <button
            className="mx-2 px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
            onClick={() => setAction("add")}
          >
            Add
          </button>
          <button
            className="mx-2 px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
            onClick={() => setAction("update")}
          >
            Update
          </button>
          <button
            className="mx-2 px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
        <div className="grid-cols-4 gap-4 mt-10 mx-auto">
          {orders.map((order, index) => {
            if (select == index)
              return (
                <button
                  onClick={() => setSelect(index)}
                  key={index}
                  className="shadow-lg rounded-xl w-64 h-80 p-4 flex flex-col bg-[#27635e] text-white hover:bg-[#134E4A]"
                >
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="w-full inline-flex justify-between"
                    >
                      <span>{item.name}</span>
                      <span>x{item.quantity}</span>
                    </div>
                  ))}
                  <div className="mt-auto font-semibold">{`Subtotal: $${order.total}`}</div>
                </button>
              );
            else
              return (
                <button
                  onClick={() => setSelect(index)}
                  key={index}
                  className="shadow-lg rounded-xl w-64 h-80 p-4 flex flex-col bg-neutral-300 hover:bg-[#134E4A] hover:text-white"
                >
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="w-full inline-flex justify-between"
                    >
                      <span>{item.name}</span>
                      <span>x{item.quantity}</span>
                    </div>
                  ))}
                  <div className="mt-auto font-semibold">{`Subtotal: $${order.total}`}</div>
                </button>
              );
          })}
        </div>
      </>
    );
  } else if (action === "update" && user.role === "staff") {
    return <UpdateOrder order={orders[select]} />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ManageOrder;
