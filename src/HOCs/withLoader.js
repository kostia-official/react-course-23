import React from 'react';
import { Spinner } from '../components/Spinner/Spinner';
import styled from 'styled-components';

const ToHide = styled.div`
  display: ${(props) => (props.isShow ? 'block' : 'none')};
`;

export const withLoader = (WrappedComponent, { loadingComponent } = {}) => {
  return class extends React.Component {
    state = {
      isLoading: true
    };

    setIsLoading = (isLoading) => {
      this.setState({ isLoading });
    };

    render() {
      return (
        <>
          <ToHide isShow={this.state.isLoading}>{loadingComponent || <Spinner />}</ToHide>

          <ToHide isShow={!this.state.isLoading}>
            <WrappedComponent
              {...this.props}
              isLoading={this.state.isLoading}
              setIsLoading={this.setIsLoading}
            />
          </ToHide>
        </>
      );
    }
  };
};
