import React, { Fragment } from 'react';
import { Spinner } from '../Spinner/Spinner';
import { StyledFadeTransition } from '../../transitions/StyledFadeTransition/StyledFadeTransition';
import styled from 'styled-components';

const ToHide = styled.div`
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
`;

export const LoaderWrapper = ({ isLoading, children, LoaderContainer = Fragment }) => {
  return (
    <div>
      <ToHide isShow={isLoading}>
        <LoaderContainer>
          <Spinner />
        </LoaderContainer>
      </ToHide>

      <ToHide isShow={!isLoading}>
        <StyledFadeTransition isShow={!isLoading} unmountOnExit={false} delay={200}>
          {children}
        </StyledFadeTransition>
      </ToHide>
    </div>
  );
};
