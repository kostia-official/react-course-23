import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Countdown.module.scss';

const ANIMATION_DELAY = 100;

export const Countdown = ({ seconds, onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(seconds);

  useEffect(() => {
    const timeout = setTimeout(onFinish, seconds * 1000);

    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 100 / seconds);
      setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1);
    }, 1000 - ANIMATION_DELAY);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [onFinish, seconds]);

  return (
    <div className={styles.container}>
      <CircularProgress variant="static" value={progress} width={50} />
      <span className={styles.secondsText}>{secondsLeft}</span>
    </div>
  );
};
