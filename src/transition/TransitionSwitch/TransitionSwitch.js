import React from 'react';
import SwitchTransition from 'react-transition-group/SwitchTransition';
import { CSSTransition } from 'react-transition-group';

export const TransitionSwitch = ({ children, transitionKey, styles }) => {
  const delay = parseInt(styles.delay);

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition key={transitionKey} timeout={delay} classNames={styles}>
        {children}
      </CSSTransition>
    </SwitchTransition>
  );
};
