//import liraries
import React from "react";

// create a component
const TimerDisplay = (props) => {
  const pretty = (val) => {
    return val === 0 ? "00" : val;
  };

  return (
    <section className="time">
      <img src={require("../../assets/images/tomato.png")} alt="" />
      <span>
        {pretty(props.currentTime.get("minutes")) +
          ":" +
          pretty(props.currentTime.get("seconds"))}
        {/** Math.floor(time / 60)}:{time % 60 === 0 ? "00" : time % 60 */}
      </span>
    </section>
  );
};

//make this component available to the app
export default TimerDisplay;
