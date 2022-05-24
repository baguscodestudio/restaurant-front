import React, { useState } from "react";
import { toast } from "react-toastify";
import UpdateItemController from "../controller/UpdateItemController";
import MenuItem from "../typings/Item";

const UpdateItem: React.FC<{
  item: MenuItem;
  setAction: React.Dispatch<React.SetStateAction<string>>;
}> = ({ item, setAction }) => {
  const [newItem, setItem] = useState<MenuItem>(item);

  const handleUpdate = async () => {
    if (
      newItem.name === "" ||
      newItem.photo === "" ||
      newItem.category === "" ||
      newItem.description === ""
    ) {
      toast.error("Please fill in all highlighted fields");
    } else {
      let UpdateItem = new UpdateItemController();
      let response = await UpdateItem.updateItem(newItem);
      if (response?.status === 200) {
        toast(`Successfully updated ${item.name} to ${newItem.name}`);
        setAction("");
      } else {
        toast.error(`Unable to save, please try again`);
      }
    }
  };

  return (
    <div className="bg-neutral-300 w-10/12 h-4/5 flex p-10 mx-auto my-auto">
      <div className="flex flex-col mx-4 items-center">
        <div className="text-lg mr-4">Item Name: {item.name}</div>
        <div className="text-lg mr-4">Price: {item.price}</div>
        <div className="text-lg mr-4">Description: {item.description}</div>
        <div className="text-lg mr-4">Category: {item.category}</div>
        <img className="max-w-sm" src={item.photo} alt="Item Photo" />
      </div>
      <div className="flex flex-col mx-4 items-center">
        <input
          className="mb-2 px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
          placeholder="New Name"
          defaultValue={item.name}
          onChange={(event) =>
            setItem({ ...newItem, name: event.currentTarget.value })
          }
        />
        <input
          className="mb-2 px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
          placeholder="New Price"
          type="number"
          step={0.01}
          defaultValue={item.price}
          onChange={(event) => {
            setItem({
              ...newItem,
              price: +parseFloat(event.currentTarget.value).toFixed(2),
            });
          }}
        />
        <textarea
          className="mb-2 px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
          placeholder="New Description"
          defaultValue={item.description}
          rows={4}
          cols={50}
          onChange={(event) =>
            setItem({ ...newItem, description: event.currentTarget.value })
          }
        />
        <input
          className="mb-2 px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
          placeholder="New Category"
          defaultValue={item.category}
          onChange={(event) =>
            setItem({ ...newItem, category: event.currentTarget.value })
          }
        />
        <input
          className="mb-2 px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
          placeholder="New Photo URL"
          defaultValue={item.photo}
          onChange={(event) =>
            setItem({ ...newItem, photo: event.currentTarget.value })
          }
        />
        <button
          className="text-white my-2 mx-2 px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateItem;
