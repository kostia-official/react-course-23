import Transition from 'react-transition-group/Transition';
import React from 'react';
import styled from 'styled-components';

const transitionOpacity = {
  entering: 0,
  entered: 1,
  exiting: 0,
  exited: 0
};

export const FadeTransitionStyle = styled.div`
  transition: opacity ${({ delay }) => delay}ms;
  opacity: ${({ transitionState }) => transitionOpacity[transitionState]};
`;

export const StyledFadeTransition = ({ children, isShow, delay = 300, unmountOnExit = true }) => {
  return (
    <Transition in={isShow} timeout={delay} unmountOnExit={unmountOnExit}>
      {(transitionState) => (
        <FadeTransitionStyle transitionState={transitionState} delay={delay}>
          {children}
        </FadeTransitionStyle>
      )}
    </Transition>
  );
};
