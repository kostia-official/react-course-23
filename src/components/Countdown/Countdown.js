import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Countdown.module.scss';

const ANIMATION_DELAY = 200;

export class Countdown extends React.Component {
  state = {
    progress: 0,
    secondsLeft: this.props.seconds
  };

  componentDidMount() {
    this.timeout = setTimeout(this.props.onFinish, this.props.seconds * 1000);

    this.interval = setInterval(() => {
      this.setState((state) => ({
        secondsLeft: state.secondsLeft - 1,
        progress: state.progress + 100 / this.props.seconds
      }));
    }, 1000 - ANIMATION_DELAY);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className={styles.container}>
        <CircularProgress variant="static" value={this.state.progress} width={50} />
        <span className={styles.secondsText}>{this.state.secondsLeft}</span>
      </div>
    );
  }
}
