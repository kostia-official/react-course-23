import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import styles from '../../styles/SlideTransition.module.scss';
import SwitchTransition from 'react-transition-group/SwitchTransition';

export function SlideTransitionSwitch({ transitionKey, children }) {
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={transitionKey}
        addEndListener={(node, done) => {
          // use the css transitionend event to mark the finish of a transition
          node.addEventListener('transitionend', done, false);
        }}
        classNames={styles}
      >
        {children}
      </CSSTransition>
    </SwitchTransition>
  );
}
