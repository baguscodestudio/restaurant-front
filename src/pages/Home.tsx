import { useState, useEffect } from "react";

const Home: React.FC<{ handleLogout: () => void }> = ({ handleLogout }) => {
  const deadline = new Date(2022, 4, 29);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let inter = setInterval(() => {
      let currentDate = new Date();
      let time_difference = deadline.getTime() - currentDate.getTime();
      setDays(Math.floor(time_difference / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time_difference / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time_difference / (1000 * 60)) % 60));
      setSeconds(Math.floor((time_difference / 1000) % 60));
    }, 1000);
    return () => {
      clearInterval(inter);
    };
  }, []);

  return (
    <>
      <div className="mx-auto inline-flex my-2">
        <button
          className="mx-2 px-4 py-2 rounded-lg bg-slate-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="text-6xl font-bold mx-auto mt-auto mb-2 text-red-800">
        CSIT314 Restaurant
      </div>
      <div className="text-4xl font-semibold mx-auto my-2 text-red-500">
        Coming Soon
      </div>
      <div className="inline-flex w-full justify-center mb-auto mt-2">
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 rounded-lg bg-rose-800 text-orange-300 flex justify-center items-center text-4xl font-bold shadow-black shadow-lg mx-2">
            {days}
          </div>
          <div className="text-red-400 font-semibold mt-4">DAYS</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 rounded-lg bg-rose-800 text-orange-300 flex justify-center items-center text-4xl font-bold shadow-black shadow-lg mx-2">
            {hours}
          </div>
          <div className="text-red-400 font-semibold mt-4">HOURS</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 rounded-lg bg-rose-800 text-orange-300 flex justify-center items-center text-4xl font-bold shadow-black shadow-lg mx-2">
            {minutes}
          </div>
          <div className="text-red-400 font-semibold mt-4">MINUTES</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 rounded-lg bg-rose-800 text-orange-300 flex justify-center items-center text-4xl font-bold shadow-black shadow-lg mx-2">
            {seconds}
          </div>
          <div className="text-red-400 font-semibold mt-4">SECONDS</div>
        </div>
      </div>
    </>
  );
};

export default Home;