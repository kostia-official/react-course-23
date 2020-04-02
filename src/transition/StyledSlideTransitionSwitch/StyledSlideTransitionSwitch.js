import React from 'react';
import Transition from 'react-transition-group/Transition';
import SwitchTransition from 'react-transition-group/SwitchTransition';
import styled from 'styled-components';

const transitionStyles = {
  entering: { opacity: 0, translateX: '100%' },
  entered: { opacity: 1, translateX: '0%' },
  exiting: { opacity: 0, translateX: '-100%' },
  exited: { opacity: 0, translateX: '-100%' }
};

export const MoveLeftTransitionStyle = styled.div`
  transition: opacity ${(p) => p.delay}ms, transform ${(p) => p.delay}ms;
  opacity: ${(p) => transitionStyles[p.transitionState].opacity};
  transform: translateX(${(p) => transitionStyles[p.transitionState].translateX});
`;

export const StyledSlideTransitionSwitch = ({ children, delay = 300, transitionKey }) => {
  return (
    <SwitchTransition mode="out-in">
      <Transition key={transitionKey} timeout={delay}>
        {(transitionState) => (
          <MoveLeftTransitionStyle transitionState={transitionState} delay={delay}>
            {children}
          </MoveLeftTransitionStyle>
        )}
      </Transition>
    </SwitchTransition>
  );
};
