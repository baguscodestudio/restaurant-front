import { Dialog } from "@headlessui/react";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import SearchBar from "../components/SearchBar";
import GetOrdersController from "../controller/GetOrdersController";
import MarkOrderController from "../controller/MarkOrderController";
import RemoveOrderController from "../controller/RemoveOrderController";
import SearchOrderController from "../controller/SearchOrderController";
import Order from "../typings/Order";
import CreateOrderStaff from "./CreateOrderStaff";
import UpdateOrder from "./UpdateOrder";

const ManageOrder = () => {
  const user = useContext(UserContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [action, setAction] = useState("");
  const [select, setSelect] = useState(-1);
  const [open, setOpen] = useState(false);
  const [isMarking, setMarking] = useState(false);
  const [email, setEmail] = useState("");

  const handleDelete = async () => {
    if (select !== -1) {
      let DeleteOrder = new RemoveOrderController();
      let response = await DeleteOrder.removeOrder(orders[select].orderid);
      if (response && response.status == 200) {
        setOpen(false);
        toast("Successfully deleted order!");
        fetchOrders();
      } else {
        toast.error("An error occured while deleting order");
      }
    } else {
      toast.error("Select an order first!");
    }
  };

  const handleSearch = async (search: string) => {
    if (search) {
      let SearchOrder = new SearchOrderController();
      let response = await SearchOrder.searchOrder(search);
      setOrders(response?.data);
    } else {
      fetchOrders();
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
      let response = await MarkOrder.updateOrderStatus(orders[select], email);
      if (response.status === 200) {
        toast("Successfully marked order as complete");
        fetchOrders();
        setMarking(false);
      } else {
        toast.error("Error occured while marking order as complete");
      }
    } else {
      toast.error("Select an order first!");
    }
  };

  const fetchOrders = async () => {
    let GetOrder = new GetOrdersController();
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
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          as="div"
          className="relative z-10"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Are you sure you want to delete this order?
                </Dialog.Title>

                <div className="w-full inline-flex text-white mt-4">
                  <button
                    className="mx-2 px-2 py-1 rounded-md bg-neutral-700 hover:bg-neutral-500 transition-colors duration-150"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="mx-2 px-2 py-1 rounded-md bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
                  >
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
        <Dialog
          open={isMarking}
          onClose={() => setMarking(false)}
          as="div"
          className="relative z-10"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Please input the customer email!
                </Dialog.Title>
                <div className="mx-auto my-2">
                  <input
                    className="px-4 placeholder-gray-500 w-full border-2 rounded-lg text-xl"
                    placeholder="Email"
                    onChange={(event) => setEmail(event.currentTarget.value)}
                  />
                </div>

                <div className="w-full inline-flex text-white mt-4">
                  <button
                    className="mx-2 px-2 py-1 rounded-md bg-neutral-700 hover:bg-neutral-500 transition-colors duration-150"
                    onClick={() => setMarking(false)}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleOrderStatus}
                    className="mx-2 px-2 py-1 rounded-md bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
                  >
                    Mark Complete
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
        <div className="inline-flex mt-10 sm:mt-24 mx-auto text-white sm:text-lg">
          <button
            className="mx-2 px-4 py-1 sm:py-4 sm:w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
            onClick={() => setAction("add")}
          >
            Add
          </button>
          <button
            className="mx-2 px-4 py-1 sm:py-4 sm:w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
            onClick={() => changePage("update")}
          >
            Update
          </button>
          <button
            className="mx-2 px-4 py-1 sm:py-4 sm:w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
            onClick={() => setOpen(true)}
          >
            Delete
          </button>
          <button
            className="mx-2 px-4 py-1 sm:py-4 sm:w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
            onClick={() => setMarking(true)}
          >
            Mark Complete
          </button>
        </div>
        <div className="w-11/12 my-2 mx-auto">
          <SearchBar
            setSearch={handleSearch}
            placeholder="Search table number"
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-10 mx-auto">
          {orders.map((order, index) => {
            if (select == index)
              return (
                <button
                  onClick={() => setSelect(index)}
                  key={index}
                  className="shadow-lg rounded-xl w-40 h-52 sm:w-64 sm:h-80 p-4 flex flex-col bg-[#27635e] text-white hover:bg-[#134E4A]"
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
                  className="shadow-lg rounded-xl w-40 h-52 sm:w-64 sm:h-80 p-4 flex flex-col bg-neutral-300 hover:bg-[#134E4A] hover:text-white"
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
