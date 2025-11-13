import { useState, useEffect } from "react";

const INITIAL_SECONDS = 0;

const Timer = () => {
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const convertToString = (sec) => {
    if (sec === 0) {
      return "0s";
    }

    const DAY = 86400;
    const HOUR = 3600;
    const MINUTE = 60;

    const days = Math.floor(sec / DAY);
    let remainingSeconds = sec % DAY;

    const hours = Math.floor(remainingSeconds / HOUR);
    remainingSeconds %= HOUR;

    const minutes = Math.floor(remainingSeconds / MINUTE);
    const finalSeconds = remainingSeconds % MINUTE;

    const parts = [];
    let hasStartedDisplay = false;

    if (days > 0) {
      hasStartedDisplay = true;
      parts.push(`${days}d`);
    }

    if (hasStartedDisplay || hours > 0) {
      hasStartedDisplay = true;
      parts.push(`${hours}h`);
    }

    if (hasStartedDisplay || minutes > 0) {
      hasStartedDisplay = true;
      parts.push(`${minutes}m`);
    }

    if (hasStartedDisplay) {
      parts.push(`${finalSeconds}s`);
    } else {
      parts.push(`${finalSeconds}s`);
    }

    return parts.join(" ");
  };

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(INITIAL_SECONDS);
  };

  return (
    <div
      className="border border-2 border-black rounded-3 p-3 m-auto mt-3"
      style={{ width: "fit-content",backgroundColor: "#ffffffff" }}
    >
      <h1 className="text-center text-primary">Timer</h1>
      <input
        value={convertToString(seconds)}
        className="form-control text-center fs-3 my-3"
        readOnly
      />
      <div className="d-flex justify-content-center gap-2">
        <button className="btn btn-danger" onClick={handleReset}>
          <i className="bi bi-arrow-counterclockwise"></i>&nbsp;Reset
        </button>
        {/* --- ส่วนที่แก้ไข --- */}
        <button
          className={`btn ${isRunning ? "btn-warning" : "btn-success"}`}
          onClick={handleToggle}
        >
          {isRunning ? (
            <>
              <i className="bi bi-pause"></i>&nbsp;Pause
            </>
          ) : (
            <>
              <i className="bi bi-play"></i>&nbsp;Run
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Timer;