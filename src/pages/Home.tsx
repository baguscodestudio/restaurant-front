import { useState, useEffect } from "react";
import ViewMenuItems from "./ViewMenuItems";

const Home = () => {
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
      <ViewMenuItems />
    </>
  );
};

export default Home;
