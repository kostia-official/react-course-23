import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import fadeTransition from '../../../styles/FadeTransition.module.scss';
import Button from '@material-ui/core/Button';

export const ActionButton = ({ transitionKey, onClick, children }) => {
  return (
    <CSSTransition key={transitionKey} timeout={400} classNames={fadeTransition}>
      <Button size="small" onClick={onClick}>
        {children}
      </Button>
    </CSSTransition>
  );
};
