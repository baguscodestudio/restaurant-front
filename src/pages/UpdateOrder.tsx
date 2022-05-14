import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Plus } from "styled-icons/bootstrap";
import { Minus } from "styled-icons/boxicons-regular";
import AddCartItemController from "../controller/AddCartItemController";
import GetCartController from "../controller/GetCartController";
import GetItemsController from "../controller/GetItemsController";
import RemoveCartItemController from "../controller/RemoveCartItemController";
import UpdateCartItemController from "../controller/UpdateCartItemController";
import UpdateOrderController from "../controller/UpdateOrderController";
import Order from "../typings/Order";
import OrderItem from "../typings/OrderItem";

const UpdateOrder = ({ order }: { order: Order }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState<OrderItem[]>([]);
  const [cart, setCart] = useState<OrderItem[]>([]);

  const fetchItems = async () => {
    let GetItems = new GetItemsController();
    let response = await GetItems.getMenuItems();
    if (response?.status === 200) {
      let items = response.data as OrderItem[];
      fetchCart(items);
    } else {
      toast.error("An error occured while getting items");
    }
  };

  const fetchCart = async (currItems: OrderItem[]) => {
    let GetCart = new GetCartController();
    let response = await GetCart.getCart(order.tablenum);
    if (response?.status === 200) {
      let tempItems = response.data as OrderItem[];
      currItems.map((item, index) => {
        tempItems.map((cartItem, cartIndex) => {
          if (item.itemid === cartItem.itemid) {
            item.quantity = cartItem.quantity;
            return;
          }
        });
      });
      setCart([...currItems]);
      setItems([...currItems]);
    } else if (response && response.response.status !== 500) {
      toast.error("An error occured while getting items");
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
      navigate("/");
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
      if (quantity > 1 || (previous > 1 && quantity == 1)) {
        console.log("updating");
        let UpdateCartItem = new UpdateCartItemController(order.tablenum);
        let response = await UpdateCartItem.updateItem(tempArr[index]);
        if (response?.status === 200) {
          // toast("Successfully updated item in cart");
        } else {
          toast.error("An error occured while updating item from cart");
        }
      } else if (quantity == 1 && previous == 0) {
        console.log("creating");
        let AddCartItem = new AddCartItemController(order.tablenum);
        let response = await AddCartItem.addCartItem(tempArr[index]);
        if (response?.status === 200) {
          // toast("Successfully added item to cart");
        } else {
          toast.error("An error occured while adding item to cart");
        }
      } else if (quantity == 0) {
        let DeleteCartItem = new RemoveCartItemController(order.tablenum);
        let response = await DeleteCartItem.removeItem(tempArr[index]);
        if (response?.status === 200) {
          // toast("Successfully removed item from cart");
        } else {
          toast.error("An error occured while removing item from cart");
        }
      }
    }
  };

  const getTotal = () => {
    let total = 0;
    items.map((item) => {
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
                  className="bg-neutral-300 rounded-lg flex h-20 overflow-clip"
                  key={index}
                >
                  <img
                    src={item.photo}
                    className="h-full w-24 object-cover mr-2"
                  />
                  <div className="flex flex-col">
                    <div className="font-bold">{item.name}</div>
                    <div className="inline-flex w-full justify-between pr-4">
                      <div>${item.price * item.quantity}</div>
                      <div>{`x${item.quantity}`}</div>
                    </div>
                  </div>
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
            <div className="w-full justify-center inline-flex items-center mt-auto mb-4">
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
          </div>
        ))}
      </div>
    </>
  );
};

export default UpdateOrder;
