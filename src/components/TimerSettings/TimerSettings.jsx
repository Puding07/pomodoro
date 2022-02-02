//import liraries
import React from "react";
import {
  faCog,
  faVolumeUp,
  faVolumeMute,
  faRunning,
  faMale,
  faComment,
  faCommentSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function notifyMe(setState, state) {
  if (!state) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      // var notification = new Notification("Hi there!");
      setState(true);
      return 1;
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          // var notification = new Notification("Hi there!");
          setState(true);
          return 1;
        }
        setState(false);
        return 0;
      });
    }
  } else {
    setState(false);
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}

// create a component
const TimerSettings = (props) => {
  return (
    <section className="settings-holder">
      <button aria-label="settings" onClick={props.setSettings}>
        <FontAwesomeIcon icon={faCog} />
      </button>
      <button aria-label="volume" onClick={props.setVolume}>
        <FontAwesomeIcon
          icon={props.volume ? faVolumeUp : faVolumeMute}
          style={{ display: props.settings ? "block" : "none" }}
        />
      </button>
      <button aria-label="sprint" onClick={props.setSprint}>
        <FontAwesomeIcon
          icon={props.sprint ? faRunning : faMale}
          style={{ display: props.settings ? "block" : "none" }}
        />
      </button>
      <button
        aria-label="notification"
        onClick={() => notifyMe(props.setNotification, props.notification)}
      >
        <FontAwesomeIcon
          icon={props.notification ? faComment : faCommentSlash}
          style={{ display: props.settings ? "block" : "none" }}
        />
      </button>
    </section>
  );
};

//make this component available to the app
export default TimerSettings;
