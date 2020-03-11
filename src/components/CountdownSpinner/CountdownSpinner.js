import React from "react";
import * as PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./CountdownSpinner.module.scss";

const ANIMATION_DELAY_MS = 200;

export class CountdownSpinner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProgress: 0,
      timeSeconds: props.timeSeconds
    };

    this.timeout = setTimeout(props.onFinish, props.timeSeconds * 1000);

    this.interval = setInterval(() => {
      this.setState(state => ({
        timeSeconds: state.timeSeconds - 1,
        currentProgress: this.calcProgress(
          state.currentProgress,
          props.timeSeconds
        )
      }));
    }, 1000 - ANIMATION_DELAY_MS);
  }

  calcProgress = (currentProgress, timeSeconds) => {
    const progressPerSecond = 100 / timeSeconds;

    return currentProgress + progressPerSecond;
  };

  componentWillUnmount() {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  }

  render() {
    return (
      <div className={styles.container}>
        <CircularProgress
          variant="static"
          value={this.state.currentProgress}
          size={50}
        />
        <span className={styles.secondsText}>{this.state.timeSeconds}</span>
      </div>
    );
  }
}

CountdownSpinner.propTypes = {
  timeSeconds: PropTypes.number,
  onFinish: PropTypes.func
};
