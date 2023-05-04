import { useState, useEffect } from "react";

const getTimeElapsed = (eventStartDate) => {
  const total = Date.parse(new Date()) - Date.parse(eventStartDate);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60 * 60)) % 24);

  return {
    total,
    days,
    hours,
    minutes,
  };
};

export default function Countdown({ eventStartDate }) {
  const [timeElapsed, setTimeElapsed] = useState(
    getTimeElapsed(eventStartDate)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeElapsed(getTimeElapsed(eventStartDate));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [eventStartDate]);

  if (timeElapsed.total < 0) {
    return <div>Event has not started yet</div>;
  }

  return (
    <div>
      {timeElapsed.days.toString().padStart(2, "0")} Days and{" "}
      {timeElapsed.hours.toString().padStart(2, "0")} Hours left to the event
    </div>
  );
}
