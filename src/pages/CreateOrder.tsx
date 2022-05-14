import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Plus } from "styled-icons/bootstrap";
import { Minus } from "styled-icons/boxicons-regular";
import { TableContext } from "../App";
import AddCartItemController from "../controller/AddCartItemController";
import CreateOrderController from "../controller/CreateOrderController";
import GetCartController from "../controller/GetCartController";
import GetItemsController from "../controller/GetItemsController";
import GetOrdersController from "../controller/GetOrdersController";
import GetOrderTableController from "../controller/GetOrderTableController";
import RemoveCartItemController from "../controller/RemoveCartItemController";
import UpdateCartItemController from "../controller/UpdateCartItemController";
import OrderItem from "../typings/OrderItem";

const CreateOrder = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<OrderItem[]>([]);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const { tablenum, setTablenum } = useContext(TableContext);
  const [confirmed, setConfirmed] = useState(false);

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
    tempArr[index] = { ...item };
    setCart(tempArr);
  };

  const handleCreateOrder = async () => {
    let total = getTotal();
    let CreateOrder = new CreateOrderController();
    let response = await CreateOrder.createOrder(tablenum, total, "ongoing");
    if (response && response.status === 200) {
      toast("Successfully created the order, please wait for your order!");
      navigate("/");
    } else if (response && response.response.status === 500) {
      toast.error("You have already created the order, please wait");
    } else {
      toast.error("An error occured while getting items");
    }
  };

  const toggleConfirm = async () => {
    let GetOrder = new GetOrderTableController();
    let response = await GetOrder.getOrder(tablenum);
    if (response.status === 200) {
      toast.error("You have already ordered! Please wait.");
      navigate("/");
    }
    setConfirmed(!confirmed);
  };

  const checkOrder = async () => {
    let GetOrder = new GetOrderTableController();
    let response = await GetOrder.getOrder(tablenum);
    if (response.status === 200) {
      navigate("/vieworder");
    } else {
      toast.error("You do not have any order on going!");
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
  }, [tablenum]);

  if (!confirmed) {
    return (
      <>
        <div className="mx-auto mt-52 flex flex-col items-center">
          <div className="text-6xl font-bold my-4">Table Number</div>
          <input
            type="number"
            defaultValue={tablenum ? tablenum : 1}
            min={1}
            max={200}
            onChange={(event) =>
              setTablenum(parseInt(event.currentTarget.value))
            }
            className="w-52 h-40 text-4xl font-bold text-center"
          />
          <div className="inline-flex mx-auto">
            <button
              onClick={toggleConfirm}
              className="text-white mx-2 px-4 py-4 text-lg rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
            >
              Create Order
            </button>
            <button
              onClick={checkOrder}
              className="text-white mx-2 px-4 py-4 text-lg rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
            >
              Check Order
            </button>
          </div>
        </div>
      </>
    );
  } else {
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
                        <div>${item.price}</div>
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
            onClick={handleCreateOrder}
            className="text-white mx-2 px-4 py-2 text-lg rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150 my-4"
          >
            Create Order
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
  }
};

export default CreateOrder;
