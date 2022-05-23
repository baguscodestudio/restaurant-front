import React, { useEffect, useState } from "react";
import GetStatisticController from "../controller/GetStatisticController";
import Customers from "../typings/Customers";
import * as XLSX from "xlsx";

const Statistics = () => {
  const [data, setData] = useState<{
    averageSpending: number;
    favorite: string;
    customers: Customers;
    visitAverage: number;
  }>();

  const fetchStatistic = async () => {
    let GetStatistic = new GetStatisticController();
    let data = await GetStatistic.getStatistic();
    setData(data);
  };

  const handleExport = () => {
    let wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(
        data
          ? Object.keys(data.customers).map((customer) => {
              return {
                CustomerEmail: customer,
                FavoriteDish: data.customers[customer].favoriteMenu,
                AverageSpending: data.customers[customer].averageSpending,
                LastVisited: `${Math.floor(
                  data.customers[customer].lastVisit!
                )} days ago `,
              };
            })
          : []
      );

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "Statistic.xlsx");
  };

  useEffect(() => {
    fetchStatistic();
  }, []);

  return (
    <div className="flex w-full">
      <div className="flex flex-col w-5/6 px-6 py-4 mx-auto">
        <div className="inline-flex justify-around text-lg text-white my-4">
          <div className="bg-[#134E4A] rounded-lg p-5 flex flex-col w-52 h-32">
            <div className="font-semibold mb-2">Average Spending</div>
            <div className="">${data?.averageSpending}</div>
          </div>
          <div className="bg-[#134E4A] rounded-lg p-5 flex flex-col w-52 h-32">
            <div className="font-semibold mb-2">Favorite Menu</div>
            <div className="">{data?.favorite}</div>
          </div>
          <div className="bg-[#134E4A] rounded-lg p-5 flex flex-col w-52 h-32">
            <div className="font-semibold mb-2">
              Average Last Customer Visited
            </div>
            <div className="">
              {data ? Math.floor(data.visitAverage + 1) : 0} days ago
            </div>
          </div>
        </div>
        <div className="w-full inline-flex justify-around px-10 my-8">
          <div className="w-full bg-neutral-300 rounded-lg h-80 mx-4 px-4 flex flex-col">
            <div className="font-semibold my-2 border-b-2">Customers</div>
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Average Spending</th>
                  <th>Favorite Dish/Drink</th>
                  <th>Last Visited</th>
                </tr>
              </thead>
              <tbody>
                {data
                  ? Object.keys(data.customers).map((customer) => (
                      <tr>
                        <td>{customer}</td>
                        <td>{data.customers[customer].averageSpending}</td>
                        <td>{data.customers[customer].favoriteMenu}</td>
                        <td>
                          {Math.floor(data.customers[customer].lastVisit!)} days
                          ago
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
        <button
          className="text-white my-2 mx-auto px-4 py-4 text-lg w-96 rounded-lg bg-[#134E4A] hover:bg-[#27635e] transition-colors duration-150"
          onClick={handleExport}
        >
          Export to Excel
        </button>
      </div>
    </div>
  );
};

export default Statistics;
