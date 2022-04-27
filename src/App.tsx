import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const deadline = new Date(2022, 4, 29);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [username, setUsername] = useState("Bagus");

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
    <div className="h-screen w-screen flex flex-col bg-orange-200">
      <div className="text-6xl font-bold mx-auto mt-auto mb-2 text-red-800">
        {username} Restaurant
      </div>
      <div className="mx-auto">
        <input
          className="px-4"
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
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
    </div>
  );
}

export default App;
