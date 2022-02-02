//import liraries
import React from "react";
import "./Hud.css";

// create a component named Hud
const Hud = ({ handleExit, ...props }) => {
  return (
    <div className="hud">
      <button className="close" onClick={handleExit}>
        x
      </button>
      {props.children}
    </div>
  );
};

//make this component available to the app
export default Hud;
