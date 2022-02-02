//import liraries
import React from "react";
import { faPause, faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// create a component
const TimerControlls = (props) => {
  return (
    <section className="controlls">
      <div>
        <button aria-label="resume" onClick={props.handleResume}>
          <FontAwesomeIcon
            icon={
              props.timerState === 2
                ? faPlay
                : props.timerState
                ? faPause
                : faPlay
            }
          />
        </button>
      </div>
      <div>
        <button aria-label="stop" onClick={props.handleStop}>
          <FontAwesomeIcon icon={faStop} />
        </button>
      </div>
    </section>
  );
};

//make this component available to the app
export default TimerControlls;
