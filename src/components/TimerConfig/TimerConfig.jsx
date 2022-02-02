//import liraries
import React from "react";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// create a component
const TimerConfig = (props) => {
  const pretty = (val) => {
    return val === 0 ? "00" : val;
  };

  const handleWorkChange = (e) => {
    const newBaseTime = props.baseTime;

    e.target.id === "workMins" &&
      newBaseTime
        .subtract(newBaseTime.get("minutes"), "minutes")
        .add(parseInt(e.target.value, 10), "minutes");
    e.target.id === "workSecs" &&
      newBaseTime
        .subtract(newBaseTime.get("seconds"), "seconds")
        .add(parseInt(e.target.value, 10), "seconds");

    props.setBaseTime(newBaseTime);
  };

  const handleBreakChange = (e) => {
    const newBaseTime = props.baseBreak;

    e.target.id === "breakMins" &&
      newBaseTime
        .subtract(newBaseTime.get("minutes"), "minutes")
        .add(parseInt(e.target.value, 10), "minutes");
    e.target.id === "breakSecs" &&
      newBaseTime
        .subtract(newBaseTime.get("seconds"), "seconds")
        .add(parseInt(e.target.value, 10), "seconds");

    props.setBreakTime(newBaseTime);
  };

  const handleWork = (add, num, string) => {
    const newBaseTime = props.baseTime;

    add ? newBaseTime.add(num, string) : newBaseTime.subtract(num, string);

    props.setBaseTime(newBaseTime);
  };

  const handleBreak = (add, num, string) => {
    const newBaseTime = props.baseBreak;

    add ? newBaseTime.add(num, string) : newBaseTime.subtract(num, string);

    props.setBreakTime(newBaseTime);
  };

  return (
    <>
      <section className="timing">
        <span className="time-name">Time</span>
        <span className="break-name">Break</span>
      </section>
      <section className="timing">
        <section className="work">
          <section className="minutes">
            <FontAwesomeIcon
              icon={faChevronUp}
              onClick={() => handleWork(true, 1, "minutes")}
            />
            <input
              id="workMins"
              type="input"
              value={pretty(props.baseTime.get("minutes"))}
              onChange={handleWorkChange}
            />
            <label htmlFor="workMins">Work Minutes</label>
            <FontAwesomeIcon
              icon={faChevronDown}
              onClick={() => handleWork(false, 1, "minutes")}
            />
          </section>
          <span className="split">:</span>
          <section className="minutes">
            <FontAwesomeIcon
              icon={faChevronUp}
              onClick={() => handleWork(true, 30, "seconds")}
            />
            <input
              id="workSecs"
              type="input"
              value={pretty(props.baseTime.get("seconds"))}
              onChange={handleWorkChange}
            />
            <label htmlFor="workSecs">Work Seconds</label>
            <FontAwesomeIcon
              icon={faChevronDown}
              onClick={() => handleWork(false, 30, "seconds")}
            />
          </section>
        </section>
        <section className="break">
          <section className="minutes">
            <FontAwesomeIcon
              icon={faChevronUp}
              onClick={() => handleBreak(true, 1, "minutes")}
            />
            <input
              id="breakMins"
              type="input"
              value={pretty(props.baseBreak.get("minutes"))}
              onChange={handleBreakChange}
            />
            <label htmlFor="breakMins">Break Minutes</label>
            <FontAwesomeIcon
              icon={faChevronDown}
              onClick={() => handleBreak(false, 1, "minutes")}
            />
          </section>
          <span className="split">:</span>
          <section className="minutes">
            <FontAwesomeIcon
              icon={faChevronUp}
              onClick={() => handleBreak(true, 30, "seconds")}
            />
            <input
              id="breakSecs"
              type="input"
              value={pretty(props.baseBreak.get("seconds"))}
              onChange={handleBreakChange}
            />
            <label htmlFor="breakSecs">Work Seconds</label>
            <FontAwesomeIcon
              icon={faChevronDown}
              onClick={() => handleBreak(false, 30, "seconds")}
            />
          </section>
        </section>
      </section>
    </>
  );
};

//make this component available to the app
export default TimerConfig;
