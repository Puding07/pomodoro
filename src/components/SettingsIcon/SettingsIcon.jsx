//import liraries
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./SettingsIcon.css";

// create a component named SettingsIcon
const SettingsIcon = ({ handleOpen, ...props }) => {
  return (
    <div className="settings-icon">
      <button aria-label="settings" onClick={handleOpen}>
        <FontAwesomeIcon icon={faCog} />
      </button>
    </div>
  );
};

//make this component available to the app
export default SettingsIcon;
