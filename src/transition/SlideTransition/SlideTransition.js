import CSSTransition from 'react-transition-group/CSSTransition';
import React from 'react';
import styles from '../../styles/SlideTransition.module.scss';

const delay = parseInt(styles.delay);

export const SlideTransition = ({ children, isShow }) => {
  return (
    <CSSTransition in={isShow} timeout={delay} unmountOnExit classNames={styles}>
      {children}
    </CSSTransition>
  );
};
