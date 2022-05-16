import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Plus, Trash } from "styled-icons/bootstrap";
import { Minus } from "styled-icons/boxicons-regular";
import GetItemsController from "../controller/GetItemsController";
import RemoveCartItemController from "../controller/RemoveCartItemController";
import UpdateOrderController from "../controller/UpdateOrderController";
import Order from "../typings/Order";
import OrderItem from "../typings/OrderItem";

const UpdateOrder = ({ order }: { order: Order }) => {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [cart, setCart] = useState<OrderItem[]>([...order.items]);

  const fetchItems = async () => {
    let GetItems = new GetItemsController();
    let response = await GetItems.getMenuItems();
    if (response?.status === 200) {
      let items = response.data as OrderItem[];
      items.map((item, index) => {
        item.quantity = 0;
      });
      setItems([...items]);
    } else {
      toast.error("An error occured while getting items");
    }
  };

  const handleAddCart = (index: number, item: OrderItem) => {
    let tempArr = [...cart];
    tempArr[index] = { ...item, tablenum: order.tablenum };
    setCart(tempArr);
  };

  const handleRemoveItem = async (index: number, item: OrderItem) => {
    let RemoveItem = new RemoveCartItemController(order.tablenum);
    let response = await RemoveItem.removeItem(item);
    if (response.status === 200) {
      let tempArr = [...cart];
      tempArr.splice(index, 1);
      setCart(tempArr);
    } else {
      toast.error("Error while removing item from cart");
    }
  };

  const handleUpdateOrder = async () => {
    let total = getTotal();
    let UpdateOrder = new UpdateOrderController();
    console.log(order.orderid, total);
    let response = await UpdateOrder.updateOrder(order.orderid, total, cart);
    console.log(response);
    if (response && response.status === 200) {
      toast("Successfully updated the order");
    } else if (response && response.response.status === 500) {
      toast.error("You have already created the order, please wait");
    } else {
      toast.error("An error occured while updating order");
    }
  };

  const handleChange = async (
    index: number,
    quantity: number,
    previous: number
  ) => {
    if (quantity >= 0) {
      let tempArr = [...items];
      tempArr[index].quantity = quantity;
      setItems([...tempArr]);
    }
  };

  const getTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <div className="absolute h-3/4 w-64 shadow-lg right-0 top-1/2 -translate-y-1/2 flex flex-col">
        <div className="grid grid-cols-1 gap-2 w-full p-2">
          {cart.map((item, index) => {
            if (item.quantity > 0) {
              return (
                <div
                  className="bg-neutral-300 rounded-lg flex flex-col h-20 overflow-clip text-sm px-3 py-2"
                  key={index}
                >
                  <div className="font-bold">{item.name}</div>
                  <div className="inline-flex w-full justify-between pr-4">
                    <div>${item.price}</div>
                    <div>{`x${item.quantity}`}</div>
                  </div>
                  <button
                    className="hover:text-red-500 hover:scale-110 ml-auto mt-auto mb-2 mr-2"
                    onClick={() => handleRemoveItem(index, item)}
                  >
                    <Trash size="16" />
                  </button>
                </div>
              );
            }
          })}
        </div>
        <div className="text-lg font-bold mt-auto my-2 mx-2">{`Total: $${getTotal()}`}</div>
        <button
          onClick={handleUpdateOrder}
          className="text-white mx-2 px-4 py-2 text-lg rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150 my-4"
        >
          Update Order
        </button>
      </div>
      <div className="mx-auto text-4xl my-10 font-bold">Menu List</div>
      <div className="mx-auto grid grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div
            className="flex flex-col w-52 h-96 rounded-lg overflow-clip shadow-xl"
            key={index}
          >
            <img
              className="w-full h-32 object-cover object-center"
              src={item.photo}
              alt={`Image of ${item.name}`}
            />
            <div className="w-full px-4 py-2 text-lg font-semibold inline-flex items-center justify-between">
              <div>{item.name}</div>
              <div>{`$${item.price}`}</div>
            </div>
            <div className="w-full px-4">{item.description}</div>
            <div className="w-full justify-center inline-flex items-center mt-auto mb-1">
              <button
                className="border-2 rounded-lg mx-2 hover:bg-neutral-400 hover:text-white transition-colors"
                onClick={() =>
                  handleChange(
                    index,
                    item.quantity ? item.quantity + 1 : 1,
                    item.quantity
                  )
                }
              >
                <Plus size="24" />
              </button>
              <input
                type="text"
                value={item.quantity}
                onChange={(event) =>
                  handleChange(
                    index,
                    parseInt(event.currentTarget.value),
                    item.quantity
                  )
                }
                className="border text-center w-6 appearance-none outline-none"
              />
              <button
                className="border-2 rounded-lg mx-2 hover:bg-neutral-400 hover:text-white transition-colors"
                onClick={() =>
                  handleChange(index, item.quantity - 1, item.quantity)
                }
              >
                <Minus size="24" />
              </button>
            </div>
            <button
              onClick={() => handleAddCart(index, item)}
              className="text-white mx-2 px-2 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150 my-4"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default UpdateOrder;
