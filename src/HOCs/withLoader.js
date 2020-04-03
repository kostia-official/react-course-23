import React from 'react';
import { Spinner } from '../components/Spinner/Spinner';
import styled from 'styled-components';
import { StyledFadeTransition } from '../transitions/StyledFadeTransition/StyledFadeTransition';

const ToHide = styled.div`
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
`;

export const withLoader = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      isLoading: true
    };

    setIsLoading = (isLoading) => {
      this.setState({ isLoading });
    };

    render() {
      return (
        <div>
          <ToHide isShow={this.state.isLoading}>
            <Spinner />
          </ToHide>

          <ToHide isShow={!this.state.isLoading}>
            <StyledFadeTransition isShow={!this.state.isLoading} unmountOnExit={false} delay={200}>
              <WrappedComponent {...this.props} setIsLoading={this.setIsLoading} />
            </StyledFadeTransition>
          </ToHide>
        </div>
      );
    }
  };
};
