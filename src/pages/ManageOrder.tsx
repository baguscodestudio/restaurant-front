import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import GetOrderController from "../controller/GetOrdersController";
import MarkOrderController from "../controller/MarkOrderController";
import RemoveOrderController from "../controller/RemoveOrderController";
import Order from "../typings/Order";
import CreateOrderStaff from "./CreateOrderStaff";
import UpdateOrder from "./UpdateOrder";

const ManageOrder = () => {
  const user = useContext(UserContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [action, setAction] = useState("");
  const [select, setSelect] = useState(-1);

  const handleDelete = async () => {
    if (select !== -1) {
      let DeleteOrder = new RemoveOrderController();
      let response = await DeleteOrder.removeOrder(orders[select].orderid);
      if (response && response.status == 200) {
        toast("Successfully deleted order!");
        fetchOrders();
      } else {
        toast.error("An error occured while deleting order");
      }
    } else {
      toast.error("Select an order first!");
    }
  };

  const changePage = (page: string) => {
    if (select !== -1) {
      setAction(page);
    } else {
      toast.error("Select an order first!");
    }
  };

  const handleOrderStatus = async () => {
    if (select !== -1) {
      let MarkOrder = new MarkOrderController();
      let response = await MarkOrder.updateOrderStatus(orders[select]);
      if (response.status === 200) {
        toast("Successfully marked order as complete");
        fetchOrders();
      } else {
        toast.error("Error occured while marking order as complete");
      }
    } else {
      toast.error("Select an order first!");
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
            onClick={() => changePage("add")}
          >
            Add
          </button>
          <button
            className="mx-2 px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
            onClick={() => changePage("update")}
          >
            Update
          </button>
          <button
            className="mx-2 px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="mx-2 px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
            onClick={handleOrderStatus}
          >
            Mark Complete
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-10 mx-auto">
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
                  <div className="mt-auto font-semibold">{`Table Number: ${order.tablenum}`}</div>
                  <div className="font-semibold">{`Subtotal: $${order.total}`}</div>
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
                  <div className="mt-auto font-semibold">{`Table Number: ${order.tablenum}`}</div>
                  <div className="font-semibold">{`Subtotal: $${order.total}`}</div>
                </button>
              );
          })}
        </div>
      </>
    );
  } else if (action === "update" && user.role === "staff") {
    return (
      <>
        <button
          className="absolute bottom-10 left-10 bg-neutral-300 px-4 rounded-lg text-lg hover:bg-neutral-600 hover:scale-105 hover:text-white"
          onClick={() => setAction("")}
        >
          Back
        </button>
        <UpdateOrder order={orders[select]} />
      </>
    );
  } else if (action === "add" && user.role === "staff") {
    return (
      <>
        <button
          className="absolute bottom-10 left-10 bg-neutral-300 px-4 rounded-lg text-lg hover:bg-neutral-600 hover:scale-105 hover:text-white"
          onClick={() => setAction("")}
        >
          Back
        </button>
        <CreateOrderStaff />
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default ManageOrder;
