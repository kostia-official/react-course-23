import React from 'react';
import { Spinner } from '../Spinner/Spinner';
import { StyledFadeTransition } from '../../transitions/StyledFadeTransition/StyledFadeTransition';
import styled from 'styled-components';

const ToHide = styled.div`
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
`;

export const LoaderWrapper = ({ isLoading, children }) => {
  return (
    <div>
      <ToHide isShow={isLoading}>
        <Spinner />
      </ToHide>

      <ToHide isShow={!isLoading}>
        <StyledFadeTransition isShow={!isLoading} unmountOnExit={false} delay={200}>
          {children}
        </StyledFadeTransition>
      </ToHide>
    </div>
  );
};
