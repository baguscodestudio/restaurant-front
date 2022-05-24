import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SearchBar from "../components/SearchBar";
import GetItemsController from "../controller/GetItemsController";
import SearchMenuItemController from "../controller/SearchMenuItemController";
import MenuItem from "../typings/Item";

const ViewMenuItems = () => {
  const [items, setItems] = useState<MenuItem[]>([]);

  const handleSearch = async (search: string) => {
    if (search) {
      let SearchItem = new SearchMenuItemController();
      let response = await SearchItem.searchMenuItem(search);
      setItems(response?.data);
      if (response?.data.length == 0) {
        toast.error("No results found");
      }
    } else {
      fetchItems();
    }
  };

  const fetchItems = async () => {
    let GetItems = new GetItemsController();
    let response = await GetItems.getMenuItems();
    if (response?.status === 200) {
      let items = response.data as MenuItem[];
      setItems([...items]);
    } else {
      toast.error("An error occured while getting items");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <div className="my-4 mx-auto text-4xl">BAGUS RESTAURANT</div>
      <div className="my-4 mx-auto w-3/4">
        <SearchBar placeholder="Search Menu Item" setSearch={handleSearch} />
      </div>
      <div className="mx-auto my-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        {items.map((item, index) => (
          <div
            className="flex flex-col w-36 h-52 sm:w-52 sm:h-96 rounded-lg overflow-clip shadow-xl"
            key={index}
          >
            <img
              className="w-full h-20 sm:h-32 object-cover object-center"
              src={item.photo}
              alt={`Image of ${item.name}`}
            />
            <div className="w-full px-4 py-2 sm:text-lg font-semibold inline-flex items-center justify-between">
              <div>{item.name}</div>
              <div>{`$${item.price}`}</div>
            </div>
            <div className="w-full px-4">{item.description}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewMenuItems;
