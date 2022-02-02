//import liraries
import React from "react";
import "./Exit.css";

// create a component named Exit
const Exit = ({ handleExit, ...props }) => {
  const handleClick = (e) => e.target.className === "exit" && handleExit();
  return (
    <div className="exit" onClick={handleClick}>
      {props.children}
    </div>
  );
};

//make this component available to the app
export default Exit;
