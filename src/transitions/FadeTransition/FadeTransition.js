import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import styles from '../../styles/FadeTransition.module.scss';

export function FadeTransition({ isShow, children, unmountOnExit = true }) {
  return (
    <CSSTransition
      in={isShow}
      addEndListener={(node, done) => {
        // use the css transitionend event to mark the finish of a transition
        node.addEventListener('transitionend', done, false);
      }}
      classNames={styles}
      unmountOnExit={unmountOnExit}
    >
      {children}
    </CSSTransition>
  );
}
