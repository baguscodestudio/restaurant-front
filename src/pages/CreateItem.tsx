import React, { useState } from "react";
import { toast } from "react-toastify";
import CreateItemController from "../controller/CreateItemController";
import MenuItem from "../typings/Item";

const CreateItem = ({
  setAction,
}: {
  setAction: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [newItem, setItem] = useState<MenuItem>({
    itemid: 0,
    name: "",
    price: 0,
    photo: "",
    category: "",
    description: "",
  });

  const storeMenu = async () => {
    let CreateItem = new CreateItemController();
    let response = await CreateItem.createItem(newItem);
    if (response?.status === 200) {
      toast(`Successfully created ${newItem.name}!`);
      setAction("");
    } else {
      toast.error(`Failed to update ${newItem.name}!`);
    }
  };

  return (
    <div className="bg-neutral-300 w-10/12 h-4/5 flex p-10 mx-auto my-auto">
      <div className="flex flex-col mx-4 items-center">
        <input
          className="mb-2 px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
          placeholder="New Name"
          onChange={(event) =>
            setItem({ ...newItem, name: event.currentTarget.value })
          }
        />
        <input
          className="mb-2 px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
          placeholder="New Price"
          type="number"
          step={0.01}
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
          rows={4}
          cols={50}
          onChange={(event) =>
            setItem({ ...newItem, description: event.currentTarget.value })
          }
        />
        <input
          className="mb-2 px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
          placeholder="New Category"
          onChange={(event) =>
            setItem({ ...newItem, category: event.currentTarget.value })
          }
        />
        <input
          className="mb-2 px-4 py-3 placeholder-gray-500 w-96 border-2 rounded-lg text-xl"
          placeholder="New Photo URL"
          onChange={(event) =>
            setItem({ ...newItem, photo: event.currentTarget.value })
          }
        />
        <button
          className="text-white my-2 mx-2 px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
          onClick={storeMenu}
        >
          Add Item
        </button>
      </div>
    </div>
  );
};

export default CreateItem;
