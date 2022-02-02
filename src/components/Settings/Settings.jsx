//import liraries
import React from "react";
import { notifyMe } from "../../Configuration/Permission";
import {
  faComment,
  faCommentSlash,
  faMale,
  faRunning,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Settings.css";

// create a component named Settings
const Settings = ({
  notification,
  setNotification,
  volume,
  setVolume,
  sprint,
  setSprint,
  ...props
}) => {
  return (
    <div className="settings">
      <h2>Settings</h2>
      <table>
        <tbody>
          <tr>
            <th>
              <span>Notification</span>
            </th>
            <td>
              <button
                aria-label="notification"
                onClick={() => notifyMe(setNotification, notification)}
              >
                <FontAwesomeIcon
                  icon={notification ? faComment : faCommentSlash}
                />
              </button>
            </td>
          </tr>
          <tr>
            <th>
              <span>Alert sound</span>
            </th>
            <td>
              <button aria-label="volume" onClick={setVolume}>
                <FontAwesomeIcon icon={volume ? faVolumeUp : faVolumeMute} />
              </button>
            </td>
          </tr>
          <tr>
            <th>
              <span>Rounds</span>
            </th>
            <td>
              <button aria-label="sprint" onClick={setSprint}>
                <FontAwesomeIcon icon={sprint ? faRunning : faMale} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <span className="description">Thank's for using this app!</span>
      <a
        href="https://gitlab.com/artonworkstm/pmodoro-timer"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>pomodoro</span>
        <span>gitlab</span>
      </a>
    </div>
  );
};

//make this component available to the app
export default Settings;
