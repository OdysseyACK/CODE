import { useState, useEffect } from "react";

const getTimeElapsed = (eventStartDate) => {
  const total = Date.parse(eventStartDate) - Date.parse(new Date());
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

  return (
    <div className="countdown">
      <section>
        <h3>{timeElapsed.days.toString().padStart(2, "0")}</h3>
        <p>Days</p>
      </section>
      <span> : </span>
      <section>
        <h3>{timeElapsed.hours.toString().padStart(2, "0")} </h3>
        <p>hours</p>
      </section>
      <span style={{ marginTop: "10px" }}>to the start of event.</span>
    </div>
  );
}
