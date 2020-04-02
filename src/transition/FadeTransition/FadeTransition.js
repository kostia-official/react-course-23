import CSSTransition from 'react-transition-group/CSSTransition';
import React from 'react';
import styles from '../../styles/FadeTransition.module.scss';

export const FadeTransition = ({ children, isShow }) => {
  return (
    <CSSTransition
      in={isShow}
      addEndListener={(node, done) => {
        // use the css transitionend event to mark the finish of a transition
        // and start exit after that
        node.addEventListener('transitionend', done, false);
      }}
      unmountOnExit
      classNames={styles}
    >
      {children}
    </CSSTransition>
  );
};
