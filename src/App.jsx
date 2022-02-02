import React, { Component } from "react";
import moment from "moment";

import "./App.css";
import installPWA from "./pwa";
import * as timerStates from "./timerStates";
import TimerConfig from "./components/TimerConfig/TimerConfig";
import TimerDisplay from "./components/TimerDisplay/TimerDisplay.jsx";
import TimerControlls from "./components/TimerControlls/TimerControlls";
import Exit from "./components/Exit/Exit";
import Hud from "./components/Hud/Hud";
import Settings from "./components/Settings/Settings";
import SettingsIcon from "./components/SettingsIcon/SettingsIcon";

const finish = require("./assets/sounds/fin.aac");
const start = require("./assets/sounds/start.wav");
const icon = require("./assets/images/tomato.png");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deferredpropmt: false,
      timer: null,
      flashing: null,
      timerState: timerStates.NOT_SET,
      currentTime: moment.duration(25, "minutes"),
      baseTime: moment.duration(25, "minutes"),
      currentBreak: moment.duration(5, "minutes"),
      baseBreak: moment.duration(5, "minutes"),
      settings: false,
      volume: false,
      soundStart: null,
      soundFinish: null,
      sprint: false,
      sprintRound: 0,
      notification: false,
      exit: true,
    };

    installPWA(this.setPromptPWA);
  }

  setPromptPWA = (item) => {
    this.setState({ deferredpropmt: item });
  };

  play = () => {
    const { baseTime, baseBreak, sprintRound } = this.state;
    this.setState({
      timerState: timerStates.RUNNING,
      currentTime: moment.duration(baseTime.asSeconds(), "seconds"),
      currentBreak: moment.duration(baseBreak.asSeconds(), "seconds"),
      timer: setInterval(this.reduceTimer, 1000),
      sprintRound: sprintRound + 1,
    });
  };

  resume = () => {
    const { timerState } = this.state;
    if (timerState && timerState !== 2) {
      this.setState({
        timerState: timerStates.RESUMED,
        timer: null,
      });
      clearInterval(this.state.timer);
    } else if (timerState === timerStates.RESUMED) {
      this.runResume();
    } else {
      this.play();
    }
  };

  runResume = () => {
    this.setState({
      timerState: timerStates.RUNNING,
      timer: setInterval(this.reduceTimer, 1000),
    });
  };

  handleStop = () => {
    const { baseTime, baseBreak, timerState, timer } = this.state;

    /** CLEAR AND RESET STATES AND INTERVAL */
    this.setState(
      {
        timerState: timerStates.NOT_SET,
        currentTime: moment.duration(baseTime.asSeconds(), "seconds"),
        currentBreak: moment.duration(baseBreak.asSeconds(), "seconds"),
        timer: null,
        sprintRound: 0,
      },
      () => timerState && clearInterval(timer)
    );
  };

  runSprint = () => {
    const { timer, baseTime, baseBreak, timerState } = this.state;

    /** RESET TIMERS */
    this.setState(
      {
        currentTime: moment.duration(baseTime.asSeconds(), "seconds"),
        currentBreak: moment.duration(baseBreak.asSeconds(), "seconds"),
        timer: null,
      },
      () => timerState && clearInterval(timer)
    );
    /** RUN THE TIMERS */
    this.play();
  };

  exitHud = () => {
    this.setState({ exit: true });
  };

  openHud = () => {
    this.setState({ exit: false });
  };

  reduceTimer = () => {
    if (this.state.timerState === timerStates.RUNNING) {
      const { currentTime, soundFinish, notification } = this.state;
      const newTime = moment.duration(currentTime.asSeconds(), "seconds");

      /** SUBTRACT 1 SECOND */
      currentTime.asSeconds() !== 0 && newTime.subtract(1, "second");

      /** UPDATE THE CURRENTTIME'S STATE */
      this.setState({
        currentTime: newTime,
      });

      /** PLAY SOUND */
      if (currentTime.asSeconds() === 1 && soundFinish) {
        soundFinish.play();
      }

      if (currentTime.asSeconds() === 1 && notification) {
        if (Notification.permission === "granted") {
          navigator.serviceWorker.ready.then(function (registration) {
            console.log("serviceworker: ready");
            registration.showNotification("Time's up, take a break!", {
              icon: icon,
              vibrate: [200, 100, 200, 100, 200, 100, 200],
              tag: "vibration-sample",
            });
          });
        }
      }

      /** SET COMPLETED STATE */
      if (newTime.asSeconds() === 0) {
        this.flashBgc();
        this.setState({
          timerState: timerStates.COMPLETED,
        });
      }
    } else {
      const {
        currentTime,
        currentBreak,
        soundStart,
        sprint,
        sprintRound,
        notification,
      } = this.state;
      const newTime = moment.duration(currentBreak.asSeconds(), "seconds");

      /** SUBTRACT 1 SECOND */
      currentTime.asSeconds() > 0 && newTime.subtract(1, "second");

      /** UPDATE CURRENT TIME AND BREAK STATE */
      newTime.asSeconds() >= 0 &&
        this.setState({
          currentBreak: newTime,
          currentTime: newTime,
        });

      /** PLAY SOUND */
      if (newTime.asSeconds() === 1 && soundStart) {
        soundStart.play();
      }

      if (currentTime.asSeconds() === 1 && notification) {
        if (Notification.permission === "granted") {
          navigator.serviceWorker.ready.then(function (registration) {
            console.log("serviceworker: ready");
            registration.showNotification(
              "Finish break, get back to business!",
              {
                icon: icon,
                vibrate: [200, 100, 200, 100, 200, 100, 200],
                tag: "vibration-sample",
              }
            );
          });
          /*
          // If it's okay let's create a notification
          new Notification("Finish break, get back to business!", {
            icon: icon,
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: "vibration-sample",
          });*/
          /*
          new Notification("Finish break, lets get back to business!", {
            body: "Hello there!",
            icon: icon,
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: "vibration-sample",
          });*/
          //new Notification("Finish break, lets get back to business!");
        }
      }

      /** STOP OR RUN SPRINT */
      if (currentBreak.asSeconds() === 0) {
        if (sprint && sprintRound < 4) {
          this.flashBgc();
          this.runSprint();
        } else {
          this.handleStop();
        }
      }
    }
  };

  flashBgc = () => {
    this.setState(
      {
        flashing: setInterval(this.bgcChange, 150),
      },
      () =>
        setTimeout(() => {
          clearInterval(this.state.flashing);
          document.querySelector("body").style.backgroundColor = "#282c34";
        }, 1000)
    );
  };

  bgcChange = () => {
    const bgc = document.querySelector("body");
    const color = bgc.style.backgroundColor;

    color === "rgba(40, 44, 52, 0.133)"
      ? (bgc.style.backgroundColor =
          this.state.timerState === 3 ? "#e9402e" : "#78c13d")
      : (bgc.style.backgroundColor = "#282c3422");
  };

  setBaseTime = (newTime) => {
    this.setState({
      baseTime: newTime,
    });
  };

  setBreakTime = (newTime) => {
    this.setState({
      baseBreak: newTime,
    });
  };

  settings = () => {
    const { settings } = this.state;
    this.setState(
      { settings: !settings },
      () =>
        !settings && setTimeout(() => this.setState({ settings: false }), 10000)
    );
  };

  volume = () => {
    const { volume } = this.state;
    this.setState({
      volume: !volume,
      soundFinish: !volume ? new Audio(finish) : null,
      soundStart: !volume ? new Audio(start) : null,
    });
  };

  sprint = () => {
    this.setState({ sprint: !this.state.sprint });
  };

  notification = (value) => {
    this.setState({ notification: value });
  };

  render() {
    const {
      deferredpropmt,
      volume,
      sprint,
      notification,
      currentTime,
      timerState,
      baseTime,
      baseBreak,
      exit,
    } = this.state;
    return (
      <main className="App">
        {deferredpropmt && (
          <button className="install" onClick={() => deferredpropmt.prompt()}>
            install
          </button>
        )}
        <article>
          <SettingsIcon handleOpen={this.openHud} />
          {!exit && (
            <Exit handleExit={this.exitHud}>
              <Hud handleExit={this.exitHud}>
                <Settings
                  volume={volume}
                  sprint={sprint}
                  notification={notification}
                  setVolume={this.volume}
                  setSprint={this.sprint}
                  setNotification={this.notification}
                />
              </Hud>
            </Exit>
          )}
          <TimerDisplay currentTime={currentTime} />
          {(!timerState || timerState === timerStates.RESUMED) && (
            <TimerConfig
              baseTime={baseTime}
              baseBreak={baseBreak}
              setBaseTime={this.setBaseTime}
              setBreakTime={this.setBreakTime}
            />
          )}
          <TimerControlls
            timerState={timerState}
            handleStop={this.handleStop}
            handleResume={this.resume}
          />
        </article>
      </main>
    );
  }
}

export default App;
