import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { Check } from "styled-icons/bootstrap";
import { Selector } from "styled-icons/heroicons-outline";
import UpdateProfileController from "../controller/UpdateProfileController";
import User from "../typings/User";

const roles = ["admin", "manager", "staff", "owner"];

const UpdateProfile: React.FC<{
  user: User;
  setAction: React.Dispatch<React.SetStateAction<string>>;
}> = ({ user, setAction }) => {
  const [role, setRole] = useState(roles[0]);

  const handleUpdateProfile = async () => {
    let UpdateProfile = new UpdateProfileController();
    let response = await UpdateProfile.updateProfile(user.userid, role);
    if (response?.status == 200) {
      toast("Successfully updated user profile");
      setAction("");
    } else {
      toast("Failed to update user profile");
    }
  };

  return (
    <div className="bg-neutral-300 w-10/12 h-4/5 flex p-10 mx-auto my-auto">
      <div className="text-lg mr-4">Username: {user.username}</div>
      <div className="flex flex-col mx-4 items-center w-64">
        <Listbox value={role} onChange={setRole}>
          <div className="relative mt-1 w-full">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{role}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                {/* <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                /> */}
                <Selector size="16" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {roles.map((option, optionIndex) => (
                  <Listbox.Option
                    key={optionIndex}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <Check size="16" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        {/* <input
          className="mb-2 px-4 py-3 placeholder-gray-500  border-2 rounded-lg text-xl"
          placeholder="New Role"
          onChange={(event) => setRole(event.currentTarget.value)}
        /> */}
        <button
          className="text-white my-2 mx-2 px-4 py-2 w-full rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
          onClick={handleUpdateProfile}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
