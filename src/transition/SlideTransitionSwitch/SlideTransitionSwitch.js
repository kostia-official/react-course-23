import React from 'react';
import SwitchTransition from 'react-transition-group/SwitchTransition';
import { CSSTransition } from 'react-transition-group';
import styles from '../../styles/SlideTransition.module.scss';

const delay = parseInt(styles.delay);

export const SlideTransitionSwitch = ({ children, transitionKey }) => {
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition key={transitionKey} timeout={delay} classNames={styles}>
        {children}
      </CSSTransition>
    </SwitchTransition>
  );
};
