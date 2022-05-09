import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import SearchBar from "../components/SearchBar";
import GetItemsController from "../controller/GetItemsController";
import RemoveItemController from "../controller/RemoveItemController";
import MenuItem from "../typings/Item";
import CreateItem from "./CreateItem";
import UpdateItem from "./UpdateItem";

// boundary title
const ManageMenu = () => {
  const user = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<MenuItem[]>([]);
  const [select, setSelect] = useState(-1);
  const [action, setAction] = useState("");

  const fetchItems = async () => {
    let GetItems = new GetItemsController();
    let response = await GetItems.getMenuItems();
    if (response?.status === 200) {
      setItems(response.data);
    } else {
      toast.error("An error occured while getting items");
    }
  };

  const handleRemove = async () => {
    let RemoveItem = new RemoveItemController();
    let response = await RemoveItem.removeItem(items[select].itemid);
    if (response?.status === 200) {
      toast("Successfully removed item");
      fetchItems();
    } else {
      toast.error("Failed to remove item!");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (user.role == "manager" && action === "")
    return (
      <>
        <div className="inline-flex mt-10 mx-auto text-white">
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
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
        <div className="w-11/12 my-2 mx-auto">
          <SearchBar setSearch={setSearch} />
        </div>
        <div className="w-11/12 h-3/5 bg-neutral-300 mx-auto mt-2 mb-auto px-10 py-4 text-lg flex flex-col">
          <table className="w-1/3">
            <thead className="text-left">
              <tr className="h-4">
                <th>Item</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {items
                .filter((item) =>
                  item.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((item, index) => (
                  <>
                    {index == select ? (
                      <tr
                        key={index}
                        className="text-white h-4 bg-[#27635e] hover:bg-[#134E4A] hover:cursor-pointer"
                        onClick={() => setSelect(index)}
                      >
                        <td>{item.name}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>{item.category}</td>
                      </tr>
                    ) : (
                      <tr
                        key={index}
                        className="h-4 hover:bg-[#134E4A] hover:text-white hover:cursor-pointer"
                        onClick={() => setSelect(index)}
                      >
                        <td>{item.name}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>{item.category}</td>
                      </tr>
                    )}
                  </>
                ))}
            </tbody>
          </table>
        </div>
      </>
    );
  else if (user.role === "manager" && action === "update") {
    return <UpdateItem item={items[select]} setAction={setAction} />;
  } else if (user.role === "manager" && action === "add") {
    return <CreateItem setAction={setAction} />;
  } else return null;
};

export default ManageMenu;
