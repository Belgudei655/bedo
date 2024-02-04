import React, { useState, useEffect } from "react";

const ClockComponent: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Move these calculations inside the useEffect
  const secToDeg = (time.getSeconds() / 60) * 360;
  const minToDeg = (time.getMinutes() / 60) * 360;
  const hrToDeg =
    ((time.getHours() % 12) / 12) * 360 + (time.getMinutes() / 60) * 30;

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="flex h-96 w-96 rounded-full items-center justify-center bg-white shadow-2xl relative">
        <div className="absolute h-10 w-10 flex justify-center">
          <span
            className="absolute h-32 w-2 bottom-0 rounded-full bg-red-500"
            style={{
              transform: `rotate(${secToDeg}deg)`,
              transformOrigin: "bottom",
            }}
          ></span>
          <span
            className="absolute h-28 w-3 bottom-0 rounded-full bg-black"
            style={{
              transform: `rotate(${minToDeg}deg)`,
              transformOrigin: "bottom",
            }}
          ></span>
          <span
            className="absolute h-24 w-4 bottom-0 rounded-full bg-black"
            style={{
              transform: `rotate(${hrToDeg}deg)`,
              transformOrigin: "bottom",
            }}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default ClockComponent;
