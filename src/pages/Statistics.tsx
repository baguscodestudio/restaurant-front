import React from "react";

const Statistics = () => {
  return (
    <div className="flex w-full">
      <div className="w-1/6 flex flex-col bg-neutral-300 mt-10">
        <div className="py-2 px-4 w-full hover:bg-white hover:cursor-pointer transition-colors">
          Search
        </div>
      </div>
      <div className="flex flex-col w-5/6 px-6 py-4">
        <div className="inline-flex justify-around text-lg text-white my-4">
          <div className="bg-[#134E4A] rounded-lg p-5 flex flex-col w-52 h-32">
            <div className="font-semibold mb-2">Average Spending</div>
            <div className="">$0</div>
          </div>
          <div className="bg-[#134E4A] rounded-lg p-5 flex flex-col w-52 h-32">
            <div className="font-semibold mb-2">Favorite Menu</div>
            <div className="">Fried Chicken</div>
          </div>
          <div className="bg-[#134E4A] rounded-lg p-5 flex flex-col w-52 h-32">
            <div className="font-semibold mb-2">Average Customer Visit</div>
            <div className="">1 every 5 days</div>
          </div>
        </div>
        <div className="w-full inline-flex justify-around px-10 my-8">
          <div className="w-1/2 bg-neutral-300 rounded-lg h-80 mx-4 flex flex-col px-4">
            <div className="font-semibold my-2 border-b-2">
              Top ordered menu
            </div>
          </div>
          <div className="w-1/2 bg-neutral-300 rounded-lg h-80 mx-4 px-4 flex flex-col">
            <div className="font-semibold my-2 border-b-2">
              Top average spender
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
